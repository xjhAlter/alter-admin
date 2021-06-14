<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "redirect",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { params, query } = route;
    const { path } = params;
    router.replace({ path: "/" + path, query });
  },
});
</script>
