<script setup lang="ts">
import { useNavStore } from '../stores/index'
const nav = useNavStore()
nav.init()
const newTag = ref('')
const isEditingTags = ref(false)

function addTodoTag(tag: string) {
  if (tag.length === 0 || nav.tags.includes(tag))
    return
  const index = nav.todoList.findIndex(item => item.id === nav.currentTodo.id)
  nav.addTodoTag(index, tag)
  newTag.value = ''
}

const keys = useMagicKeys()
whenever(keys.enter, () => {
  if (newTag.value.length)
    addTodoTag(newTag.value)
})
</script>

<template>
  <input
    v-model="newTag"
    type="text"
    block outline-none color-black max-w-4rem
    @click.stop="() => {}"
    @blur="addTodoTag(newTag)"
  >
  <div
    v-if="nav.filterTags.length || newTag"
    style="background: rgb(40, 50, 57);"
    rounded-1
  >
    <div
      v-if="!nav.filterTags.length && newTag"
      frs bg-blue rounded-1 p-2px pl-8px pr-8px cusor-pointer
      @click="addTodoTag(newTag)"
    >
      <div color-white>
        New tags {{ newTag }}
      </div>
    </div>
    <template v-if="nav.filterTags.length">
      <div
        v-for="(tag, tagIndex) in nav.filterTags"
        :key="`tag-${tagIndex}`"
        frs hover:bg-blue rounded-1 p-2px pl-8px pr-8px cusor-pointer
        @click="addTodoTag(tag)"
      >
        <div i="carbon-tag" color-white300 mr-4px />
        <div color-white>
          {{ tag }}
        </div>
      </div>
    </template>
  </div>
</template>
