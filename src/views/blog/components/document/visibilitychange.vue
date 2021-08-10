<template>
    <div class="blog-container">
        <span class="blog-title">判断浏览器标签页是否切换</span>
        <section class="blog-desc">
            监听 visibilitychange 事件，当页面切换时 document.visibilityState 的值会变更为
            'hidden'，当回到该页面时，值会变为 'visible'
        </section>
        <div class="hljs-code" v-highlight>
            <pre><code class="JavaScript">document.addEventListener("visibilitychange", function() {
    console.log(document.visibilityState);
});</code></pre>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'visibilitychange',
    })
</script>

<style lang="scss" scoped></style>
