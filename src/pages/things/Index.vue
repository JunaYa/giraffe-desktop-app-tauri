<script lang="ts" setup>
import { useNavStore } from './stores/index'

const nav = useNavStore()
nav.init()
</script>

<template>
  <Slidebar>
    <template #slide>
      <div w-auto h-100vh overflow-hidden p-2 pt-2rem style="background: #f5f6f8;">
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
    </template>
    <template #main >
      <div>
        content
      </div>
    </template>
  </Slidebar>
</template>

<style scoped>
  .separator {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
  }

  .separator i {
    display: inline-block;
    width: 1px;
    height: 14px;
    margin: 0 1px;
    background-color: #e9e9e9;
  }
</style>
