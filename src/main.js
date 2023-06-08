import { createApp } from 'vue'
import App from './App.vue'
import '../styles.css'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faMagnifyingGlass,
	faChevronLeft,
	faSun,
	faMoon,
	faSpinner,
	faAngleLeft,
	faAngleRight
} from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faAngleLeft, faAngleRight, faChevronLeft, faSun, faMoon, faSpinner)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
