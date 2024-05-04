import {createRouter, createWebHistory} from 'vue-router'
import StartView from '../views/StartView.vue'
import authService from "@/modules/auth/services/AuthService";
import HeaderLayout from "@/views/layout/HeaderLayout.vue";
import type {User} from "@/modules/core/types/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            name: 'root',
            component: HeaderLayout,
            meta: { requiresAuth: true },
            redirect: {name: 'home'},
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('../views/StartView.vue'),
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
                    path: '/editor/new',
                    name: 'new-editor',
                    component: () => import('../views/EditorView.vue'),
                    meta: { requiresAdmin: true },
                },
                {
                    path: '/editor/:id',
                    name: 'editor',
                    component: () => import('../views/EditorView.vue'),
                    meta: { requiresAdmin: true },
                    props: route => ({ id: Number(route.params.id) }),
                }
            ]
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

    ]
})
router.beforeEach(async (to, from) => {

    const user: User | null = await authService.getUser().catch(() => null);
    if (to.meta.requiresAuth && !user) {
        return {
            name: 'login',
            // save the location we were at to come back later
            query: {redirect: to.fullPath},
        }
    }
    if (to.meta.requiresGuest && user) {
        return {
            name: 'home',
        }
    }
    if (to.meta.requiresAdmin && !user?.admin ) {
        return {
            name: 'home',
        }
    }
})
export default router
