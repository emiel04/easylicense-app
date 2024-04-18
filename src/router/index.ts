import {createRouter, createWebHistory} from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: StartView
        },
        {
            path: '/theory',
            name: 'theory',
            component: () => import('../views/TheoryView.vue')
        },
        {
          path: '/reactions',
          name: 'reactions',
          component: () => import('../views/ReactionsView.vue')
        }
    ]
})

export default router
