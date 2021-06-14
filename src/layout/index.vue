<template>
  <div class="app-wrapper">
    layout
    <app-main></app-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppMain } from "./components";
export default defineComponent({
  name: "Layout",
  components: {
    AppMain,
  },
  setup() {
    console.log("setup");
  },
});
</script>

<style lang="scss" scoped>
</style>