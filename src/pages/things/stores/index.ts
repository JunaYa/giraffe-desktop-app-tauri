import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Menu, Todo } from './type'
import getMenuList from './menus'
const NAV_MAP = {
  project: 'New Project',
  area: 'New Area',
}
export const useNavStore = defineStore('main', {
  state: () => {
    return {
      currentMenu: getMenuList()[0] as Menu,
      navList: getMenuList() as Menu[],
      todoList: [] as Todo[],
      currentTodo: {} as Todo,
      lastTodo: {} as Todo,
    }
  },
  getters: {
    currentNav: state => state.currentMenu,
    menuList: state => state.navList,
    // todoList: state => state.todoList,
    nameMap: (): Record<string, string> => NAV_MAP,
    canEdit: (state): boolean => {
      return Object.keys(NAV_MAP).includes(state.currentMenu.type)
    },
    isEditingTodo: (state): boolean => {
      return state.currentTodo.isEditing
    },
  },
  actions: {
    init() {
      this.navList = getMenuList()
    },
    updateNavList(list: Array<Menu>) {
      this.navList = list
    },
    activeMenu(menu: Menu) {
      this.currentMenu = menu
    },
    updateNavName(name: string) {
      this.currentMenu.name = name
    },
    addAreaOrProject(name: string, type: string, icon: string) {
      this.navList.push({
        id: uuid(),
        name,
        type,
        icon,
        path: '/things/add',
        color: '#fdd502',
      })
      this.activeMenu(this.navList[this.navList.length - 1])
    },
    createNewTodo() {
      this.closeEditTodo()

      const newTodo = {
        pid: this.currentNav.id,
        id: uuid(),
        type: '',
        title: '',
        notes: '',
        checked: false,
        selected: false,
        status: 0,
        isEditing: true,
        createaAt: Date.now().toString(),
        updateAt: Date.now().toString(),
        when: '',
        deadline: '',
        tags: [],
        checkList: [],
      } as Todo
      this.todoList.push(newTodo)
      this.lastTodo = this.currentTodo
      this.currentTodo = newTodo
    },
    updateTodo(index: number, todo: Todo) {
      this.todoList[index] = todo
      this.todoList[index].updateAt = Date.now().toString()
    },
    toggleCheckTodo(index: number) {
      this.todoList[index].checked = !this.todoList[index].checked
      this.todoList[index].updateAt = Date.now().toString()
    },
    updateTodoWhen(index: number, when: string) {
      this.todoList[index].when = when
      this.todoList[index].updateAt = Date.now().toString()
    },
    updateTodoDeadline(index: number, deadline: string) {
      this.todoList[index].deadline = deadline
      this.todoList[index].updateAt = Date.now().toString()
    },
    updateTodoTitle(index: number, title: string) {
      this.todoList[index].title = title
      this.todoList[index].updateAt = Date.now().toString()
    },
    updateTodoNotes(index: number, notes: string) {
      this.todoList[index].notes = notes
      this.todoList[index].updateAt = Date.now().toString()
    },
    updateTodoSelect(index: number) {
      this.todoList[index].selected = !this.todoList[index].selected
      this.todoList[index].updateAt = Date.now().toString()
    },
    setCurrentTodo(todo: Todo) {
      this.lastTodo = this.currentTodo
      this.currentTodo = todo
    },
    toggleEditTodo() {
      const currentIndex = this.todoList.findIndex(item => item.id === this.currentTodo.id)
      if (this.todoList[currentIndex])
        this.todoList[currentIndex].isEditing = !this.todoList[currentIndex].isEditing
    },
    closeEditTodo() {
      const currentIndex = this.todoList.findIndex(item => item.id === this.currentTodo.id)
      if (this.todoList[currentIndex])
        this.todoList[currentIndex].isEditing = false
    },
    openEditTodo() {
      const currentIndex = this.todoList.findIndex(item => item.id === this.currentTodo.id)
      const oldIndex = this.todoList.findIndex(item => item.id === this.lastTodo.id)
      if (this.todoList[currentIndex])
        this.todoList[currentIndex].isEditing = true
      if (this.todoList[oldIndex])
        this.todoList[oldIndex].isEditing = false
    },
    toggleSelectedTodo() {
      const currentIndex = this.todoList.findIndex(item => item.id === this.currentTodo.id)
      if (this.todoList[currentIndex])
        this.todoList[currentIndex].selected = !this.todoList[currentIndex].selected
    },
    closeSelectedTodo() {
      const currentIndex = this.todoList.findIndex(item => item.id === this.currentTodo.id)
      if (this.todoList[currentIndex])
        this.todoList[currentIndex].selected = false
    },
    openSelectedTodo() {
      const currentIndex = this.todoList.findIndex(item => item.id === this.currentTodo.id)
      const oldIndex = this.todoList.findIndex(item => item.id === this.lastTodo.id)
      if (this.todoList[currentIndex])
        this.todoList[currentIndex].selected = true
      if (this.todoList[oldIndex])
        this.todoList[oldIndex].selected = false
    },
    cancelTodo() {
      this.closeEditTodo()
      this.closeSelectedTodo()
      this.setCurrentTodo({} as Todo)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))
