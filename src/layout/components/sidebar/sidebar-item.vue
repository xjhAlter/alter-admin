<template>
  <div v-if="!(item.meta && item.meta.hidden)">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <i :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template #title>
            <span>{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-nemu"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from "path";
import AppLink from "./link.vue";
import { defineComponent, PropType, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
export default defineComponent({
  name: "sidebarItem",
  components: { AppLink },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const onlyOneChild = ref<RouteRecordRaw>({} as any);
    function hasOneShowingChild(
      children: RouteRecordRaw[] = [],
      parent: RouteRecordRaw
    ): boolean {
      const showingChildren = children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          onlyOneChild.value = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        // @ts-ignore  RouteRecordRaw 不允许直接在router根节点添加属性
        onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    }
    const resolvePath = (routePath: string) => {
      return path.resolve(props.basePath, routePath);
    };
    return {
      hasOneShowingChild,
      resolvePath,
      onlyOneChild,
    };
  },
});
</script>

<style>
</style>