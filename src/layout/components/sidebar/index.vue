<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="false"
      active-text-color="#409eff"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import sidebarItem from "./sidebar-item.vue";
export default defineComponent({
  name: "sidebar",
  components: { sidebarItem },
  setup() {
    const route = useRoute();
    const store = useStore();
    const routes = computed(() => {
      return useRouter().options.routes;
    });
    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    // const isCollapse = computed(() => !store.getters.sidebar.opened);
      const isCollapse = computed(() => false);
    return {
      routes,
      activeMenu,
      isCollapse,
    };
  },
});
</script>

<style>
</style>