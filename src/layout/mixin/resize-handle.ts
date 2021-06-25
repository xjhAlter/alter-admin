import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrao's responsive design

export default {
    watch: {
        $route() {
            // @ts-ignore
            if (this.device === 'mobile' && this.sidebar.opened) {
                store.dispatch('app/closeSidebar', { withoutAnimation: false })
            }
        }
    },
    beforeMount() {
        // @ts-ignore
        window.addEventListener('resize', this.$_resizeHandler)
    },
    beforeDestroy() {
        // @ts-ignore
        window.removeEventListener('resize', this.$_resizeHandler)
    },
    mounted() {
        // @ts-ignore
        if (this.$_isMobile()) {
            store.dispatch('app/toggleDevice', 'mobile')
            store.dispatch('app/closeSidebar', { withoutAnimation: false })
        }
        console.log(store.state.app.device)
    },
    methods: {
        $_isMobile() {
            const rect = body.getBoundingClientRect();
            return rect.width - 1 < WIDTH
        },
        $_resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.$_isMobile()
                store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

                if (isMobile) {
                    store.dispatch('app/closeSidebar', { withoutAnimation: false })
                }
            }
        }
    }
}