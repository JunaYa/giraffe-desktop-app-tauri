<script lang="ts" setup>

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
    if (sidebarWidth.value < 200) {
        sidebarWidth.value = 200
    }
  }

  document
    ?.querySelector('.separator')
    ?.addEventListener('mousedown', startDrag)
})
</script>

<template>
  <div frb>
    <div relative w-auto min-w-36px min-h-100vh max-h-100vh :style="{ width: sidebarWidth + 'px' }">
      <slot name="slide" />
      <div class="separator" absolute top-0 right-0 frc w-14px h-100vh bg-white cursor-col-resize><i></i><i></i></div>
    </div>
    <div relative flex-1 id="things_main">
      <slot name="main" />
    </div>
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
