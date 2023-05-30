import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Where in the World?',
        isPublic: true
      }
    },
    {
      path: '/country/:name',
      name: 'country',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/InformationCard.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title : `${to.params.name}`
  next()
})

export default router
