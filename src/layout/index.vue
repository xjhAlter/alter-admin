<template>
  <div class="app-wrapper">
    <!-- 侧边导航栏 -->
    <sidebar class="sidebar-container"/>
    <!-- 内容 -->
    <div class="main-container">
      <div>

      </div>
       <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppMain, Sidebar } from "./components";
export default defineComponent({
  name: "Layout",
  components: {
    AppMain, Sidebar
  },
  setup() {
    console.log("setup");
  },
});
</script>

<style lang="scss" scoped>
</style>