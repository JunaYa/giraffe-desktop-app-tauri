<script lang="ts" setup>
import { useNavStore } from './stores/index'
import { Menu } from './stores/type'

const nav = useNavStore()
nav.init()
console.log('nav', nav.currentNav)

const router = useRouter()
const onClick = (info: Menu) => {
  // router.push(info?.path)
  nav.activeMenu(info?.id)
}

let sidebarWidth = ref<any>(200)
let startWidth = ref<any>(200)
let startX = ref<any>(0)

onMounted(() => {
  const startDrag = (e: any) => {
    startWidth.value = sidebarWidth.value
    startX.value = e.clientX
    document.documentElement.addEventListener('mousemove', onDrag)
    document.documentElement.addEventListener('mouseup', stopDrag)
  }

  const onDrag = (e: any) => {
    sidebarWidth.value = startWidth.value + e.clientX - startX.value
  }

  const stopDrag = (e: any) => {
    document.documentElement.removeEventListener('mousemove', onDrag)
    document.documentElement.removeEventListener('mouseup', stopDrag)
  }

  document
    ?.querySelector('.separator')
    ?.addEventListener('mousedown', startDrag)
})
</script>

<template>
  <div relative min-w-36px pr-14px :style="{ width: sidebarWidth + 'px' }">
    <div w-auto h-100vh overflow-hidden p-2 pt-2rem style="background: #f5f6f8;">
      <nav
        v-for="(item, index) in nav.menuList"
        :key="index"
        frb p1
        class="menu-btn"
        :class="item.id === nav.currentNav ? 'bg-gray-200' : ''"
        active:bg-gray-200
        @click="onClick(item)">
        <span>{{item.name}}</span>
        </nav>
    </div>
    <div class="separator" absolute top-0 right-0 frc w-14px h-100vh bg-white cursor-col-resize><i></i><i></i></div>
  </div>
  <div relative flex-1 id="things_main">
    <!-- <router-view /> -->
  </div>
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
