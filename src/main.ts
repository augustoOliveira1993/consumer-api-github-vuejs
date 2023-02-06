import { createApp } from 'vue'
import './style.css'
import routes from "./routes/index";
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.use(routes)

app.mount('#app')
