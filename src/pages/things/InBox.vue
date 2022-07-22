<script lang="ts" setup>
  const onClick = () => {
    console.log('---- click')
  }
</script>
<template>
  <div class="inbox-root">InBox</div>
  <div class="type-group">
    <button text="default" @click="onClick">aya</button>
    <button type="primary" text="primary" @click="onClick">aya</button>
    <button type="info" text="info" @click="onClick">aya</button>
    <button type="success" size="tiny" text="success" @click="onClick"
      >aya</button
    >
    <button type="warning" size="small" text="warning" @click="onClick"
      >aya</button
    >
    <button type="danger" size="medium" text="danger" @click="onClick"
      >aya</button
    >
    <button type="danger" text="danger" disabled @click="onClick">aya</button>
  </div>
  <div class="shadow-group">
    <button shadow="pill" @click="onClick">aya</button>
    <button shadow="raised" @click="onClick">aya</button>
    <button shadow="primary" @click="onClick">aya</button>
    <button pin shadow="pill" shape="round" @click="onClick">+</button>
    <button pin shadow="raised" shape="round" @click="onClick">+</button>
    <button pin shadow="pill" shape="square" @click="onClick">+</button>
    <button pin shadow="raised" shape="square" @click="onClick">+</button>
  </div>
  <div class="size-group">
    <button text="tiny" size="tiny" @click="onClick">aya</button>
    <button text="small" size="small" @click="onClick">aya</button>
    <button text="medium" size="medium" @click="onClick">aya</button>
    <button text="large" size="large" @click="onClick">aya</button>
  </div>
</template>
