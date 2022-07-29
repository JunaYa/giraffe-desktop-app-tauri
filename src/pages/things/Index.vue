<script lang="ts" setup>
import { NPopover } from 'naive-ui'
import { useNavStore } from './stores/index'
import type { Todo } from './stores/type'
const nav = useNavStore()
nav.init()

const timeoutId = ref()
function onTodoSelect(todo: Todo) {
  if (timeoutId.value && nav.currentTodo.id === todo.id) {
    clearTimeout(timeoutId.value)
    timeoutId.value = 0
    nav.openEditTodo()
    nav.closeSelectedTodo()
    return
  }
  timeoutId.value = setTimeout(() => {
    clearTimeout(timeoutId.value)
    timeoutId.value = 0
    nav.setCurrentTodo(todo)
    nav.openSelectedTodo()
  }, 200)
}

const newTag = ref('')
const isEditingTags = ref(false)

function onNewTagChange(index: number) {
  isEditingTags.value = false
  if (newTag.value.length === 0)
    return

  if (nav.tags.includes(newTag.value)) {
    newTag.value = ''
    return
  }

  nav.addTag(newTag.value)
  nav.currentTodo.tags.push(newTag.value)
  nav.updateTodoTags(index, nav.currentTodo.tags)
  newTag.value = ''
}

function addTodoTag(index: number, tag: string) {
  if (tag.length === 0 || nav.tags.includes(tag))
    return

  nav.addTodoTag(index, tag)
  newTag.value = ''
}

const keys = useMagicKeys()
whenever(keys.enter, () => {
  if (newTag.value.length) {
    const index = nav.todoList.findIndex(item => item.id === nav.currentTodo.id)
    addTodoTag(index, newTag.value)
  }
})

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
      <div class="other" p-12 bg-white :style="nav.isEditingTodo ? 'background: rgb(247, 247, 249)' : ''" @click="nav.cancelTodo">
        <header mb-2rem frs>
          <div v-if="!nav.canEdit">
            {{ nav.currentNav.name }}
          </div>
          <div v-else>
            <div :i="nav.currentNav.icon" :style="`color: ${nav.currentNav.color};`" />
            <input v-model="nav.currentMenu.name" :placeholder="nav.nameMap[nav.currentNav.type]" @blue="nav.updateNavName(nav.currentMenu)">
          </div>
          <div class="icon-btn" i-carbon:overflow-menu-horizontal ml-1rem />
        </header>
        <template v-for="(todoItem, todoIndex) in nav.todoList" :key="todoItem.id">
          <div
            :bg="todoItem.isEditing ? 'white' : todoItem.selected ? 'blue300' : ''"
            :class="todoItem.isEditing
              ? 'shadow'
              : ''"
            rounded p-3
            @click.stop="() => {}"
          >
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
                {{ todoItem.title || 'New to-do' }}
                <span
                  v-for="(tagItem, tagIndex) in todoItem.tags"
                  :key="`todo-tags-${tagIndex}`"
                  color-gray300 rounded-1rem min-h-1rem pt-2px pb-2px pr-8px pl-8px mr-4px border-solid border-width-1px
                >{{ tagItem }}</span>
              </div>
              <div v-show="todoItem.isEditing" flex-1 fcs color-black300>
                <input
                  v-model="todoItem.title"
                  type="text"
                  placeholder="New To-Do"
                  block outline-none color-black
                  @blur="nav.updateTodoTitle(todoIndex, todoItem.title)"
                >
                <input
                  v-model="todoItem.notes"
                  type="text"
                  placeholder="Notes"
                  block outline-none mb-4 color-black
                  @blur="nav.updateTodoNotes(todoIndex, todoItem.notes)"
                >
                <div frb>
                  <div>
                    <div v-if="todoItem.checkList.length">
                      {{ todoItem.checkList }}
                    </div>
                    <div v-if="todoItem.tags.length" frs>
                      <span
                        v-for="(tagItem, tagIndex) in todoItem.tags"
                        :key="`todo-tags-${tagIndex}`"
                        bg-green300 rounded-lg min-h-1rem pt-2px pb-2px pr-8px pl-8px mr-4px
                      >{{ tagItem }}</span>
                      <NPopover trigger="click" placement="bottom" :show-arrow="false" style="background: rgb(40, 50, 57);">
                        <template #trigger>
                          <input
                            v-model="newTag"
                            type="text"
                            block outline-none color-black max-w-4rem
                            @click.stop="() => {}"
                            @blur="addTodoTag(todoIndex, newTag)"
                          >
                        </template>
                        <div v-if="nav.filterTags.length || newTag" style="background: rgb(40, 50, 57);" rounded-1>
                          <div
                            v-if="(!nav.filterTags.length || nav.filterTags.every(tag => tag.indexOf(newTag) === -1)) && newTag"
                            frs bg-blue rounded-1 p-2px pl-8px pr-8px cusor-pointer
                            @click="addTodoTag(todoIndex, newTag)"
                          >
                            <div color-white>
                              New tags {{ newTag }}
                            </div>
                          </div>
                          <template v-else>
                            <div
                              v-for="(tag, tagIndex) in nav.filterTags"
                              :key="`tag-${tagIndex}`"
                              frs hover:bg-blue rounded-1 p-2px pl-8px pr-8px cusor-pointer
                              :class="{ 'bg-blue': newTag.length > 0 && tag.indexOf(newTag) > -1 }"
                              @click="addTodoTag(todoIndex, tag)"
                            >
                              <div i="carbon-tag" color-white300 mr-4px />
                              <div color-white>
                                {{ tag }}
                              </div>
                            </div>
                          </template>
                        </div>
                      </NPopover>
                    </div>
                    <div v-if="todoItem.when" icon-btn frs>
                      {{ todoItem.when }} <div inline-block ml-8px i-carbon-close-outline @click="nav.updateTodoWhen(todoIndex, '')" />
                    </div>
                    <div v-if="todoItem.deadline" icon-btn frs>
                      {{ todoItem.deadline }}
                      <div inline-block ml-8px i-carbon-close-outline @click="nav.updateTodoDeadline(todoIndex, '')" />
                    </div>
                  </div>
                  <div self-end flex flex-1 flex-row items-center justify-end>
                    <button v-if="!todoItem.when" class="icon-btn mx-2 !outline-none color-gray" @click="nav.updateTodoWhen(todoIndex, Date.now().toString())">
                      <div i="carbon-calendar" />
                    </button>
                    <button v-if="!todoItem.tags.length" class="icon-btn mx-2 !outline-none color-gray">
                      <NPopover trigger="click" placement="bottom" :show-arrow="false" style="background: rgb(40, 50, 57);">
                        <template #trigger>
                          <div frs>
                            <div i="carbon-tag" mr-4px @click="isEditingTags = true" />
                            <input
                              v-if="isEditingTags"
                              v-model="newTag"
                              type="text"
                              placeholder="Tags"
                              block outline-none color-black max-w-4rem
                              @click.stop="() => {}"
                              @blur="onNewTagChange(todoIndex)"
                            >
                          </div>
                        </template>
                        <template v-if="isEditingTags && (nav.filterTags.length || (!nav.filterTags.length && newTag))">
                          <div style="background: rgb(40, 50, 57);" rounded-1>
                            <div
                              v-if="!nav.filterTags.length || nav.filterTags.every(tag => tag.indexOf(newTag) === -1)"
                              frs bg-blue rounded-1 p-2px pl-8px pr-8px cusor-pointer
                              @click="addTodoTag(todoIndex, newTag)"
                            >
                              <div color-white>
                                New tags {{ newTag }}
                              </div>
                            </div>
                            <template v-else>
                              <div
                                v-for="(tag, tagIndex) in nav.filterTags"
                                :key="`tag-${tagIndex}`"
                                frs hover:bg-blue rounded-1 p-2px pl-8px pr-8px cusor-pointer
                                :class="{ 'bg-blue': newTag.length > 0 && tag.indexOf(newTag) > -1 }"
                                @click="addTodoTag(todoIndex, tag)"
                              >
                                <div i="carbon-tag" color-white300 mr-4px />
                                <div color-white>
                                  {{ tag }}
                                </div>
                              </div>
                            </template>
                          </div>
                        </template>
                      </NPopover>
                    </button>
                    <button v-if="!todoItem.checkList.length" class="icon-btn mx-2 !outline-none color-gray">
                      <div i="carbon-list" />
                    </button>
                    <button v-if="!todoItem.deadline" class="icon-btn mx-2 !outline-none color-gray" @click="nav.updateTodoDeadline(todoIndex, Date.now().toString())">
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
