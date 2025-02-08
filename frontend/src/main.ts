import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import directiveList from './directives/directives'

const app = createApp(App)

app.use(router)

directiveList.forEach(directive => {
	directive.register(app)
})

app.mount('#app')
