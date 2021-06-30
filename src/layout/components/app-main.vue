<template>
  <section class="app-main">
    <div class="app-page-wrapper">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" v-if="cached" />
        </keep-alive>
        <component :is="Component" :key="key" v-if="!cached" />
      </router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import store from "@/store";
export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute();
    const cachedViews: any = computed(() => {
      return store.getters.cachedViews;
    });
    const key = computed(() => {
      return route.path;
    });
    const cached = computed(() => {
      const name = route.name;
      if (cachedViews.value.indexOf(name) > -1) {
        return true;
      } else {
        return false;
      }
    });
    return {
      cachedViews,
      key,
      cached,
    };
  },
});
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 85px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.app-page-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
