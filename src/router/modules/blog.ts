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
                name: "documentBlog",
                component: () => import("@/views/blog/document.vue"),
                meta: {
                    title: "document",
                    savedPosition: false,
                },
            },
            {
                path: "css",
                name: "cssBlog",
                component: () => import("@/views/blog/css.vue"),
                meta: {
                    title: "css",
                    savedPosition: false,
                },
            },
            {
                path: "layout",
                name: "layoutBlog",
                component: () => import("@/views/blog/layout.vue"),
                meta: {
                    title: "布局",
                    savedPosition: false,
                },
            },
        ]
    }
]