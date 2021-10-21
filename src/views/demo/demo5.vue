<template>
    <div class="page page-demo5">
        <div class="parent">
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
        </div>
        <div class="parent bg-red">
            <el-input v-model="px" placeholder="请输入内容"></el-input>
            <p style="padding: 10px; background: #eee">{{ rem }}</p>
            <div>
                <div v-for="n in 20" :key="n">
                    <span :style="{ 'font-size': n + 'px' }">{{ n }}: Get your meme shared!</span>
                </div>
            </div>
            <div style="width: 200px">
                <svg
                    class="hdxxx"
                    width="100%"
                    height="50"
                    viewBox="0 0 320 50"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <text x="0" y="20">这个标题很长哦可能一行放不下的怎么办呢</text>
                </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, toRefs, computed } from 'vue'
    export default defineComponent({
        name: 'demo5',
        setup() {
            const state = reactive({
                k: 1920,
                px: 0,
            })

            const rem = computed(() => {
                // page1
                // return (state.px / 1080) * 100;

                // page 2 bingo
                // return state.px * 65 / 1075;

                // page 3
                // return (state.px / 1320) * 100;

                // page 3 vh -> rem
                return (state.px * 2.96) / 16.8182

                // rem 2560
                // return state.px / 100 * 1.3333333333;

                // rem 1920
                // return state.px / 100;

                // m dialog-login rem 44% -> 80%
                // return ((state.px * 0.8) / (846 / 1920));
            })

            return {
                ...toRefs(state),
                rem,
            }
        },
    })
</script>

<style lang="scss" scoped>
    .page-demo5 {
        .parent {
            width: 1000px;
            height: 400px;
            background-color: rgba($color: #409eff, $alpha: 0.5);
            &.bg-red {
                background-color: rgba($color: #ff0000, $alpha: 0.5);
            }
            .child {
                display: inline-block;
                width: 0;
            }
            .child:nth-child(1) {
                margin: 10% 5%; // 根据父元素的宽度计算
                background-color: red;
            }
            .child:nth-child(2) {
                padding: 10% 5%; // 根据父元素的宽度计算
                background-color: #fff;
            }
            .child:nth-child(3) {
                width: 100px;
                height: 100px;
                //border-width: 10%; // 没有用,不支持百分比
                border-style: solid;
                border-color: #409eff;
            }
        }
    }
</style>
