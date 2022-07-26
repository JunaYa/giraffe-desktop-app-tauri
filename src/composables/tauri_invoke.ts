import { invoke } from '@tauri-apps/api'
import { WebviewWindow } from '@tauri-apps/api/window'
/**
 * open docs new window
 */
export const openDocs = () => {
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
  invoke('close_splashscreen')
}

export const great = async (): String => {
  const result = await invoke('greet', { name: 'World' })
  return result.response as String
}
