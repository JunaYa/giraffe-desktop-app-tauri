<script lang="ts" setup>
import { useNavStore } from './stores/index'

const nav = useNavStore()
nav.init()
</script>

<template>
  <Slidebar>
    <template #slide>
      <div class="other" flex-1 w-auto h-auto overflow-y-scroll p-2 pt-2rem style="background: #f5f6f8;">
        <nav
          v-for="(item, index) in nav.menuList"
          :key="index"
          frb p1
          class="menu-btn"
          :class="item.id === nav.currentNav ? 'bg-gray-200' : ''"
          active:bg-gray-200
          @click="nav.activeMenu(item?.id)">
          <span>{{item.name}}</span>
        </nav>
      </div>
      <footer flex-0>
        content
      </footer>
    </template>
    <template #main >
      <div class="other" p-12 style="background: rgb(247, 247, 249)">
        <div bg-white p-6 rounded-sm>
          <div frs>
            <input self-start mt-1 type="checkbox" mr-2 class="default:ring-2 ..." />
            <div flex-1 fcs>
              <input type="text" placeholder="New To-Do" block outline-none class="default:ring-2 ..." />
              <input type="text" placeholder="Notes" block outline-none mb-4 class="default:ring-2 ..." />
              <div frb>
                <button>tody</button>
                <div flex flex-row items-center justify-end>
                  <button class="icon-btn mx-2 !outline-none" >
                    <div i="carbon-calendar" />
                  </button>
                  <button class="icon-btn mx-2 !outline-none" >
                    <div i="carbon-tag" />
                  </button>
                  <button class="icon-btn mx-2 !outline-none" >
                    <div i="carbon-list" />
                  </button>
                   <button class="icon-btn mx-2 !outline-none" >
                    <div i="carbon-flag" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer frc>
        <button class="icon-btn" i="ph:plus-bold">+</button>
      </footer>
    </template>
  </Slidebar>
</template>

<style scoped>
  .other {
    height: calc(100vh - 2rem);
  }

  footer {
    height: 2rem;
    background: #f5f6f8;
  }
</style>
