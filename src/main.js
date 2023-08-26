import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import sweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(sweetalert2)
app.mount('#app')

//createApp(App).use(store).use(router).use(sweetalert2).mount('#app')
