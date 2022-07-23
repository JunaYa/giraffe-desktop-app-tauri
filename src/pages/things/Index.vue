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
      <div class="other">
        content
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
