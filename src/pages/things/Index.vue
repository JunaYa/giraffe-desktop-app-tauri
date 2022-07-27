<script lang="ts" setup>
import { NPopover } from 'naive-ui'
import { useNavStore } from './stores/index'
import type { Todo } from './stores/type'
const nav = useNavStore()
nav.init()

function cancelEdit() {
  console.log('------')
  nav.closeEditTodo()
  nav.closeSelectedTodo()
  nav.setCurrentTodo({} as Todo)
}

function onTodoSelect(todo: Todo) {
  nav.setCurrentTodo(todo)
  if (nav.currentTodo.id === todo.id) {
    nav.openEditTodo()
    return
  }
  const timeoutId = setTimeout(() => {
    nav.openSelectedTodo()
    clearTimeout(timeoutId)
  }, 300)
}

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
          :class="item.id ? 'bg-gray-200' : ''"
          active:bg-gray-200
          @click="nav.activeMenu(item)"
        >
          <span>{{ item.name || nav.nameMap[item.type] }}</span>
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
            <div hover:bg-blue rounded-1 frs @click="nav.addAreaOrProject('', 'project', 'carbon-in-progress')">
              <div i-carbon-in-progress color-bluegray w-1rem h-1rem mr-4px mt-2px self-start />
              <div>
                <div color-white font-bold>
                  New Project
                </div>
                <div max-w-18rem color-gray>
                  Define a goal, then work towards it one to-do at a time
                </div>
              </div>
            </div>
            <div h-1px divide-solid bg-gray mt-12px mb-12px />
            <div hover:bg-blue rounded-1 frs @click="nav.addAreaOrProject('', 'area', 'carbon-layers')">
              <div i-carbon-layers color-green w-1rem h-1rem mr-4px mt-2px self-start />
              <div>
                <div color-white font-bold>
                  New Area
                </div>
                <div max-w-18rem color-gray>
                  Group your projects and to-dos based on different responsibilities, such as Family or Work.
                </div>
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
      <div class="other" p-12 bg-white :style="nav.isEditingTodo ? 'background: rgb(247, 247, 249)' : ''" @click="cancelEdit">
        <header mb-2rem frs>
          <div v-if="!nav.canEdit">
            {{ nav.currentNav.name }}
          </div>
          <div v-else>
            <div :i="nav.currentNav.icon" :style="`color: ${nav.currentNav.color};`" />
            <input :placeholder="nav.nameMap[nav.currentNav.type]">
          </div>
          <div class="icon-btn" i-carbon:overflow-menu-horizontal ml-1rem />
        </header>
        <template v-for="(todoItem, todoIndex) in nav.todoList" :key="todoItem.id">
          <div bg-white p-6 rounded-sm mb-1rem shadow border-solid border-color-gray100 border-width-2px @click.stop="() => {}">
            <div frs>
              <div
                self-start mt-1px mr-4px
                :i="!todoItem.checked ? 'carbon-checkbox' : 'carbon-checkbox-checked'"
                :color="!todoItem.checked ? 'gray' : 'blue'"
                @click="nav.toggleCheckTodo(todoIndex)"
              />
              <div
                v-if="!todoItem.isEditing" flex-1 fcs
                color-gray
                @click="onTodoSelect(todoItem)"
              >
                New To-Do
              </div>
              <div v-if="todoItem.isEditing" flex-1 fcs color-black300>
                <input type="text" placeholder="New To-Do" block outline-none color-black>
                <input type="text" placeholder="Notes" block outline-none mb-4 color-black>
                <div frb>
                  <div v-if="todoItem.checkList.length">
                    {{ todoItem.checkList }}
                  </div>
                  <div v-if="todoItem.tags.length">
                    {{ todoItem.tags }}
                  </div>
                  <button v-if="todoItem.when" icon-btn frc>
                    {{ todoItem.when }} <div inline-block ml-8px i-carbon-close-outline @click="nav.updateTodoWhen(todoIndex, '')" />
                  </button>
                  <button v-if="todoItem.deadline">
                    {{ todoItem.deadline }}
                  </button>
                  <div flex flex-1 flex-row items-center justify-end>
                    <button v-if="!todoItem.when" class="icon-btn mx-2 !outline-none color-gray" @click="nav.updateTodoWhen(todoIndex, Date.now().toString())">
                      <div i="carbon-calendar" />
                    </button>
                    <button v-if="!todoItem.tags.length" class="icon-btn mx-2 !outline-none color-gray">
                      <div i="carbon-tag" />
                    </button>
                    <button v-if="!todoItem.checkList.length" class="icon-btn mx-2 !outline-none color-gray">
                      <div i="carbon-list" />
                    </button>
                    <button v-if="!todoItem.deadline" class="icon-btn mx-2 !outline-none color-gray">
                      <div i="carbon-flag" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <footer frc>
        <button class="icon-btn" i="carbon-add" @click="nav.createNewTodo" />
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
