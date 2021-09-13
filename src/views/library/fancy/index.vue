<template>
    <div class="page">
        <h1 class="page-title">fancy-components</h1>

        <fc-wave-filter class="punishing" color="#409eff" amplitude="2" dur="3" delay="0.5">
            <img src="/src/assets/img/common/punishing.png" />
        </fc-wave-filter>

        <img src="/src/assets/img/char/keqing.png" class="keqing outline" />
        <fc-wave-filter class="keqing" amplitude="1" dur="5" delay="2" mode="img">
            <img src="/src/assets/img/char/keqing.png" />
        </fc-wave-filter>
    </div>
</template>

<script lang="ts">
    /***
     * 参考链接： https://juejin.cn/post/7005763586999975943
     */
    import { defineComponent } from 'vue'

    export default defineComponent({})
</script>

<style lang="scss" scoped>
    .page {
        background-color: #e3f9fd;
        overflow-y: auto;
        padding: 0 20px;
        position: relative;
    }
    .punishing {
        position: absolute;
        top: 80px;
        left: 50px;
    }
    .keqing {
        width: 600px;
        --width: 600px;
        position: absolute;
        top: 150px;
        left: 100px;
        &.outline {
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
            filter: gray;
            opacity: 0.3;
        }
    }
</style>
