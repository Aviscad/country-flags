import { createApp } from 'vue'
import App from './App.vue'
import '../styles.css'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faChevronLeft, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)
library.add(faChevronLeft)
library.add(faSun)
library.add(faMoon)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
