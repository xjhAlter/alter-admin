import { createRouter, RouteRecordRaw, createWebHashHistory, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue"
import store from '@/store'

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "main",
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/views/index.vue"),
                meta: {
                    icon: "el-icon-s-home",
                    title: "Home",
                    savedPosition: false,
                    affix: true
                },
            },
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login.vue"),
        meta: {
            title: "login",
            hidden: true,
        },
    },
    {
        path: "/redirect",
        name: "redirect",
        component: Layout,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect.vue"),
                meta: { hidden: true }
            },
        ],
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory('/demo/'),  // 提供可选的base
    routes: constantRoutes,
});

router.beforeEach((to, _from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        if (store.getters.token) {
            next()
        } else {
            next('/login')
        }
    }
});

export default router;