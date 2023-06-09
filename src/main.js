import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, { ripple: true, inputStyle: 'outline' })
app.mount('#app')
