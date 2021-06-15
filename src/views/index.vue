<template>
  <h1>Hello {{ userInfo.username }}</h1>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import store from "@/store";
export default defineComponent({
  name: "home",
  setup() {
    const userInfo = computed(() => {
      return store.getters.userInfo;
    });
    return {
      userInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>