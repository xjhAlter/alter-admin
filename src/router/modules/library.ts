import Layout from '@/layout/index.vue'
export default [
    {
        path: '/library',
        name: 'library',
        component: Layout,
        redirect: '/library/fancy-components',
        meta: { title: 'Library', icon: 'el-icon-box' },
        children: [
            {
                path: 'fancy-components',
                name: 'fancy',
                component: () => import('@/views/library/fancy/index.vue'),
                meta: {
                    title: 'fancy-components',
                    savedPosition: false,
                },
            },
        ],
    },
]
