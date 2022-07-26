import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Menu, Todo } from './type'
import getMenuList from './menus'

export const useNavStore = defineStore('main', {
  state: () => {
    return {
      currentPage: 1001 as number,
      navList: [] as Menu[],
      todoList: [] as Todo[],
    }
  },
  getters: {
    currentNav: state => state.currentPage,
    menuList: state => state.navList,
    todoList: state => state.todoList,
  },
  actions: {
    init() {
      this.navList = getMenuList()
    },
    updateNavList(list: Array<Menu>) {
      this.navList = list
    },
    activeMenu(page: number) {
      this.currentPage = page
    },
    addAearOrProject(name: string, type: string) {
      this.navList.push({
        id: this.navList.length + 1,
        name,
        icon: `icon-menu-${type}`,
        path: '/things/add',
        color: '#fdd502',
      })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))
