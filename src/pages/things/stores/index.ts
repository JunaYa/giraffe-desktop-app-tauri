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
      currentMenu: useStorage('currentMenu', getMenuList()[0] as Menu),
      navList: useStorage('navList', [] as Menu[]),
      todoList: useStorage('todoList', [] as Todo[]),
      currentTodo: useStorage('currentTodo', {} as Todo),
      lastTodo: useStorage('lastTodo', {} as Todo),
      tags: useStorage('tags', [] as string[]),
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
    filterTags: (state): string[] => {
      const tags = state.currentTodo.tags
      // return state.tags.filter(tag => !tags.includes(tag))
      return state.tags
    },
  },
  actions: {
    init() {
      if (this.navList.length === 0)
        this.navList = getMenuList()

      this.currentMenu = this.navList[0]
      this.todoList = this.currentMenu.todoList
    },
    updateNavList(list: Array<Menu>) {
      this.navList = list
    },
    activeMenu(menu: Menu) {
      this.cancelTodo()
      this.currentMenu = menu
      this.todoList = this.currentMenu.todoList
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
        todoList: [],
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
      this.setCurrentTodo(newTodo)
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
    updateTodoTags(index: number, tags: string[]) {
      this.todoList[index].tags = tags
      this.todoList[index].updateAt = Date.now().toString()
    },
    addTodoTag(index: number, tag: string) {
      this.addTag(tag)
      this.todoList[index].tags.push(tag)
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

    // tags
    addTag(tag: string) {
      console.log('tag', tag)
      if (!this.tags.includes(tag))
        this.tags.push(tag)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))
