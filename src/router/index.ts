import {createRouter, createWebHistory} from 'vue-router'
import StartView from '../views/StartView.vue'
import authService from "@/modules/auth/services/AuthService";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: StartView,
            meta: { requiresAuth: true }
        },
        {
            path: '/theory',
            name: 'theory',
            component: () => import('../views/TheoryView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/theory/:id',
            name: 'lesson',
            component: () => import('../views/LessonView.vue'),
            props: route => ({ id: Number(route.params.id) }),
        },
        {
            path: '/reviews',
            name: 'reviews',
            component: () => import('../views/ReviewsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: { requiresGuest: true }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue'),
            meta: { requiresGuest: true }
        },
        {
            path: '/editor',
            name: 'editor',
            component: () => import('../views/EditorView.vue'),
        }
    ]
})
router.beforeEach(async (to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.requiresAuth && !(await authService.getUser())) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: '/login',
            // save the location we were at to come back later
            query: {redirect: to.fullPath},
        }
    }
})
export default router
