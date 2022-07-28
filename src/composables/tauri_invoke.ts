import { invoke } from '@tauri-apps/api'
import { WebviewWindow } from '@tauri-apps/api/window'
const inTauri = () => {
  // return window.invoke
  return true
}
/**
 * open docs new window
 */
export const openDocs = () => {
  if (!inTauri())
    return

  const webview = new WebviewWindow('theUniqueLabel', {
    url: 'hi/there',
  })
  // since the webview window is created asynchronously,
  // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
  webview.once('tauri://created', () => {
  // webview window successfully created
  })
  webview.once('tauri://error', (_e) => {
  // an error happened creating the webview window
  })
}

/**
 * close splash window
 */
export const closeSplashscreen = () => {
  if (!inTauri())
    return
  invoke('close_splashscreen')
}

export const great = async (): String => {
  if (!inTauri())
    return ''
  const result = await invoke('greet', { name: 'World' })
  return result.response as String
}
