<template>
    <div class="page page-blog">
        <h1 class="page-title">Document</h1>
        <visibilitychange />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import documentBlogs from '@/views/blog/components/document/index'

    export default defineComponent({
        name: 'document',
        components: { ...documentBlogs },
    })
</script>

<style lang="scss" scoped></style>
