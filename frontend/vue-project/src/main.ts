import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'
import config from './formkit.config'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(plugin, defaultConfig(config))

app.mount('#app')
