import { createRouter, RouteRecordRaw, createWebHashHistory, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import Layout from '../layout/index.vue'
import store from '@/store'
import demoRoutes from './modules/demo'
import blogRoutes from './modules/blog'

NProgress.configure({ showSpinner: false })

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/index.vue'),
                meta: {
                    icon: 'el-icon-s-home',
                    title: 'Home',
                    savedPosition: false,
                    affix: true,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: 'login',
            hidden: true,
        },
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: Layout,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect.vue'),
                meta: { hidden: true },
            },
        ],
    },
    ...blogRoutes,
    ...demoRoutes,
]

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory('/demo/'),  // 提供可选的base
    routes: constantRoutes,
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
