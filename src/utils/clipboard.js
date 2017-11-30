//网页复制功能的实现

import Clipboard from 'clipboard'
import Vue from 'vue'

function clipboardSuccess () {
  Vue.prototype.$message({
    message: 'Copy success',
    type: 'success',
    duration: 1500
  })
}

function clipboardError () {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
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

