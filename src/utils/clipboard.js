//网页复制功能的实现

import Clipboard from 'clipboard'
import Vue from 'vue'

function clipboardSuccess () {
  Vue.prototype.$snotify.success('Copy Successfully!')
 
}

function clipboardError () {
  Vue.prototype.$snotify.error('Copy Failed!')
}

export default function handleClipboard (event) {
  const clipboard = new Clipboard(event.target)
  clipboard.on('success', (e) => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
    e.clearSelection()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

