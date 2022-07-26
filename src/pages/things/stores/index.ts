import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Menu, Todo } from './type'
import getMenuList from './menus'
const NAV_MAP = {
  'project': 'New Project',
  'area': 'New Area',
}
export const useNavStore = defineStore('main', {
  state: () => {
    return {
      currentMenu: getMenuList()[0] as Menu,
      navList: getMenuList() as Menu[],
      todoList: [] as Todo[],
    }
  },
  getters: {
    currentNav: state => state.currentMenu,
    menuList: state => state.navList,
    // todoList: state => state.todoList,
    nameMap: (): Record<string, string> => NAV_MAP,
    canEdit: (state): boolean => {
      return Object.keys(NAV_MAP).includes(state.currentMenu.type)
    }
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
      const newTodo = {
        pid: this.currentNav.id,
        id: uuid(),
        type: '',
        title: '',
        notes: '',
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
    },
    updateTodo(todo: Todo) {}
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))
