import Layout from "@/layout/index.vue"
export default [
    {
        path: "/demo",
        name: 'demo',
        component: Layout,
        redirect: "/demo/demo1",
        meta: { title: "菜单测试", icon: "el-icon-menu" },
        children: [
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