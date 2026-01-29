import { createApp } from 'vue'
import App from './App.vue'
import browser from 'webextension-polyfill'

const app = createApp(App)
app.config.globalProperties.$browser = browser
app.mount('#app')