import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue"
import store from '@/store'

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Layout,
        redirect: "/Home",
        children: [
            {
                path: "/Home",
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
    history: createWebHistory(),
    routes: constantRoutes,
});

router.beforeEach((to, _from, next) => {
    console.log(to.path)
    console.log(store.getters.token);
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