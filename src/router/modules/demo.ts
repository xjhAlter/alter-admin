import Layout from "@/layout/index.vue"
export default [
    {
        path: "/demo",
        name: 'demo',
        component: Layout,
        redirect: "/demo/demo1",
        meta: { title: "Demo", icon: "el-icon-monitor" },
        children: [
            {
                path: "waterfall",
                name: "waterfallDemo",
                component: () => import("@/views/demo/waterfall.vue"),
                meta: {
                    title: "瀑布流",
                    savedPosition: false,
                },
            },
            {
                path: "scroll-number",
                name: "scrollNumberDemo",
                component: () => import("@/views/demo/scroll-number.vue"),
                meta: {
                    title: "滚动数字",
                    savedPosition: false,
                },
            },
            {
                path: "demo1",
                name: "demo1",
                component: () => import("@/views/demo/demo1.vue"),
                meta: {
                    title: "demo1",
                    savedPosition: false,
                },
            },
            {
                path: "demo2",
                name: "demo2",
                component: () => import("@/views/demo/demo2.vue"),
                meta: {
                    title: "demo2",
                    savedPosition: false,
                },
            },
        ]
    }
]