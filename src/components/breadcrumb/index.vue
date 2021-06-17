<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
        class="no-redirect"
        >{{ item.meta.title }}</span
      >
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, watch, ref, Ref } from "vue";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";
export default defineComponent({
  name: "breadcrumb",
  setup() {
    const levelList: Ref<RouteLocationMatched[]> = ref([]);
    const route = useRoute();
    const router = useRouter();
    const isDashboard = (route: RouteLocationMatched): boolean | string => {
      const name = route && (route.name as string);
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "welcome".toLocaleLowerCase();
    };

    const getBreadcrumb = (): void => {
      let matched = route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];
      if (!isDashboard(first)) {
        matched = [
          {
            path: "/home",
            meta: { title: "首页" },
          } as unknown as RouteLocationMatched,
        ].concat(matched);
      }
      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    };

    getBreadcrumb();

    // 监听route.path变化
    watch(
      () => route.path,
      () => getBreadcrumb()
    );

    // 点击跳转
    const handleLink = (item: RouteLocationMatched): any => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect.toString());
        return;
      }
      router.push(path);
    };

    return { levelList, handleLink };
  },
});
</script>

<style lang="scss" scoped >
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>