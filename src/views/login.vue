<template>
  <div class="login">前往权限中心中。。。</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "login",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const ticket = route.query.ticket;
    router.push("/");
  },
});
</script>
