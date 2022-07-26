<script lang="ts" setup>
import { useNavStore } from './stores/index'
import { NPopover } from 'naive-ui'
const nav = useNavStore()
nav.init()

const isNewItem = ref(false)

onMounted(() => {
  // `invoke` returns a Promise
  setTimeout(() => {
    closeSplashscreen()
  }, 3000)
})
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
          @click="nav.activeMenu(item?.id)"
        >
          <span>{{ item.name }}</span>
        </nav>
      </div>
      <footer flex-0 frb p-1 pr-2rem>
        <NPopover trigger="click" placement="top" :show-arrow="false" style="background: rgb(40, 50, 57);">
          <template #trigger>
            <button class="newList" relative icon-btn frc hover:border p-1>
              <div i-carbon-add font-bold />
              <span>NewList</span>
            </button>
          </template>
          <div style="background: rgb(40, 50, 57);" rounded-1 p-4px break-after-all>
            <div hover:bg-blue rounded-1 frs @click="nav.addAreaOrProject('New Project', 'project')">
              <div i-carbon-in-progress color-bluegray w-1rem h-1rem mr-4px mt-2px self-start/>
              <div>
                <div color-white font-bold>New Project</div>
                <div max-w-18rem color-gray>Define a goal, then work towards it one to-do at a time</div>
              </div>
            </div>
            <div h-1px divide-solid bg-gray mt-12px mb-12px/>
            <div hover:bg-blue rounded-1 frs @click="nav.addAreaOrProject('New Area', 'area')">
              <div i-carbon-layers color-green w-1rem h-1rem mr-4px mt-2px self-start/>
              <div>
                <div color-white font-bold>New Area</div>
                <div max-w-18rem color-gray>Group your projects and to-dos based on different responsibilities, such as Family or Work.</div>
              </div>
            </div>
          </div>
        </NPopover>
        <button icon-btn hover:border p-1>
          <div i="carbon-settings-adjust" />
        </button>
      </footer>
    </template>
    <template #main>
      <div class="other" p-12 style="background: rgb(247, 247, 249)">
        <div bg-white p-6 rounded-sm>
          <div frs>
            <input self-start mt-1 type="checkbox" mr-2 class="default:ring-2 ...">
            <div flex-1 fcs>
              <input type="text" placeholder="New To-Do" block outline-none class="default:ring-2 ...">
              <input type="text" placeholder="Notes" block outline-none mb-4 class="default:ring-2 ...">
              <div frb>
                <button>tody</button>
                <div flex flex-row items-center justify-end>
                  <button class="icon-btn mx-2 !outline-none">
                    <div i="carbon-calendar" />
                  </button>
                  <button class="icon-btn mx-2 !outline-none">
                    <div i="carbon-tag" />
                  </button>
                  <button class="icon-btn mx-2 !outline-none">
                    <div i="carbon-list" />
                  </button>
                  <button class="icon-btn mx-2 !outline-none">
                    <div i="carbon-flag" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer frc>
        <button class="icon-btn" i="ph:plus-bold">
          +
        </button>
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
