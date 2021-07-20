import Layout from "@/layout/index.vue"
export default [
    {
        path: "/blog",
        name: 'blog',
        component: Layout,
        redirect: "/blog/document",
        meta: { title: "Blogs", icon: "el-icon-collection" },
        children: [
            {
                path: "document",
                name: "document",
                component: () => import("@/views/blog/document.vue"),
                meta: {
                    title: "document",
                    savedPosition: false,
                },
            },
            {
                path: "css",
                name: "css",
                component: () => import("@/views/blog/css.vue"),
                meta: {
                    title: "css",
                    savedPosition: false,
                },
            },
        ]
    }
]