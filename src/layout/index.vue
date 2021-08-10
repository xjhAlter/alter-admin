<template>
    <div class="app-wrapper" :class="classObj">
        <div
            v-if="device === 'mobile' && sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside"
        />
        <!-- 侧边导航栏 -->
        <sidebar class="sidebar-container" />
        <!-- 内容 -->
        <div class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <!-- 顶部导航菜单 -->
                <nav-bar></nav-bar>
                <!-- tags-view 有点问题(会触发两次页面初始化的钩子), 暂时隐藏 -->
                <!-- <tags-view></tags-view> -->
            </div>
            <app-main></app-main>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, reactive, toRefs } from 'vue'
    import { useStore } from 'vuex'
    import { IAppState } from '@/store/modules/app'
    import { AppMain, Sidebar, NavBar, tagsView } from './components'
    import resizeHandler from './mixin/resize-handle'

    interface ISet extends IAppState {
        fixedHeader: boolean
    }

    export default defineComponent({
        name: 'Layout',
        components: {
            AppMain,
            Sidebar,
            NavBar,
            tagsView,
        },
        mixins: [resizeHandler],
        setup() {
            const store = useStore()

            const set: ISet = reactive({
                sidebar: computed(() => {
                    return store.state.app.sidebar
                }),
                device: computed(() => {
                    return store.state.app.device
                }),
                fixedHeader: computed(() => {
                    return store.state.settings.fixedHeader
                }),
            })

            const classObj = computed(() => {
                return {
                    hideSidebar: !set.sidebar.opened,
                    openSidebar: set.sidebar.opened,
                    withoutAnimation: set.sidebar.withoutAnimation,
                    mobile: set.device === 'mobile',
                }
            })

            //切换侧边栏打开方式
            const handleClickOutside = () => {
                store.dispatch('app/closeSidebar', { withoutAnimation: false })
            }

            return {
                ...toRefs(set),
                classObj,
                handleClickOutside,
            }
        },
    })
</script>

<style lang="scss" scoped>
    @import '@/styles/variables.scss';
    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px);
    }

    .mobile .fixed-header {
        width: 100%;
    }
</style>
