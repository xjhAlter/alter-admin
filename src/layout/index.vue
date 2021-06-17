<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 侧边导航栏 -->
    <sidebar class="sidebar-container" />
    <!-- 内容 -->
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 顶部导航菜单 -->
        <nav-bar></nav-bar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { IAppState } from "@/store/modules/app";
import { AppMain, Sidebar, NavBar } from "./components";

interface ISet extends IAppState {
  fixedHeader: boolean;
}

export default defineComponent({
  name: "Layout",
  components: {
    AppMain,
    Sidebar,
    NavBar,
  },
  setup() {
    const store = useStore();

    const set: ISet = reactive({
      sidebar: computed(() => {
        return store.state.app.sidebar;
      }),
      device: computed(() => {
        return store.state.app.deivce;
      }),
      fixedHeader: computed(() => {
        return store.state.settings.fixedHeader;
      }),
    });

    const classObj = computed(() => {
      return {
        hideSidebar: !set.sidebar.opened,
        openSidebar: set.sidebar.opened,
        withoutAnimation: set.sidebar.withoutAnimation,
        mobile: set.device === "mobile",
      };
    });

    //切换侧边栏打开方式
    const handleClickOutside = () => {
      store.dispatch("app/closeSideBar", { withoutAnimation: false });
    };

    return {
      ...toRefs(set),
      classObj,
      handleClickOutside,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
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