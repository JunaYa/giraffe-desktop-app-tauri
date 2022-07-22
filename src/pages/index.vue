<script setup lang="ts">
import { invoke } from '@tauri-apps/api'
import { WebviewWindow } from '@tauri-apps/api/window'

const openDocs = () => {
  const webview = new WebviewWindow('theUniqueLabel', {
    url: 'hi/there',
  })
  // since the webview window is created asynchronously,
  // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
  webview.once('tauri://created', () => {
  // webview window successfully created
  })
  webview.once('tauri://error', (e) => {
  // an error happened creating the webview window
  })
}

const closeSplashscreen = () => {
  invoke('close_splashscreen')
}

const test = ref('')
invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then(response => test.value = response)
const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

onMounted(() => {
  // `invoke` returns a Promise
  setTimeout(() => {
    closeSplashscreen()
  }, 3000)
})
</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <button @click="openDocs">
      open docs
    </button>
    <button @click="closeSplashscreen">
      close splashscreen
    </button>
    <div>test {{ test }}</div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
