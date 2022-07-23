import { defineStore, acceptHMRUpdate } from 'pinia'
import { Menu, Todo } from './type'
import { useStorage } from '@vueuse/core'
// import state from './state'
// import getters from './getters'
// import actions from './actions'

export const useNavStore = defineStore('main', {
  state: () => {
    return {
      currentPage: 1001 as number,
      navList: [] as Menu[],
      todoList: [] as Todo[],
    }
  },
  getters: {
    currentNav: (state) => state.currentPage,
    menuList: (state) => state.navList,
    todoList: (state) => state.todoList,
  },
  actions: {
    init() {
      this.navList = [
        {
          id: 1001,
          name: 'InBox',
          icon: 'icon-menu-inbox',
          path: '/things/inbox',
          color: '#fdd502',
        },
        {
          id: 1002,
          name: 'Today',
          icon: 'icon-menu-today',
          path: '/things/today',
          color: '#27a2f0',
        },
        {
          id: 1003,
          name: 'UpComming',
          icon: 'icon-menu-upcomming',
          path: '/things/upcomming',
          color: '#f83470',
        },
        {
          id: 1004,
          name: 'Anytime',
          icon: 'icon-menu-anytime',
          path: '/things/anytime',
          color: '#37a59a',
        },
        {
          id: 1005,
          name: 'Someday',
          icon: 'icon-menu-someday',
          path: '/things/someday',
          color: '#cabe86',
        },
        {
          id: 1006,
          name: 'Logbook',
          icon: 'icon-menu-logbook',
          path: '/things/logbook',
          color: '#4abd5e',
        },
      ]
    },
    updateNavList(list: Array<Menu>) {
      this.navList = list
    },
    activeMenu(page: number) {
      this.currentPage = page
    },
  },
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))
}