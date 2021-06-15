<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
export default defineComponent({
  name: "appLink",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let { to } = toRefs(props);
    // 判断是否外链
    const isExternal = computed(() => {
      return /^(https?:|mailto:|tel:)/.test(to.value);
    });
    const type = computed(() => {
      if (isExternal.value) {
        return "a";
      }
      return "router-link";
    });
    const linkProps = function (to: string): object {
      if (isExternal.value) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        to: to,
      };
    };
    return {
      type,
      linkProps,
    };
  },
});
</script>

<style>
</style>