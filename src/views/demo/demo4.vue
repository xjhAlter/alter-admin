<template>
    <div class="demo4-page" @mousemove="handleMove">
        <img
            src="http://192.168.14.3:8005/static/bingo/images/page/title.png"
            alt=""
            class="moving-title"
            :style="moveStyle"
        />

        <div class="bounce">
            <span class="letter">P</span>
            <span class="letter">U</span>
            <span class="letter">N</span>
            <span class="letter">I</span>
            <span class="letter">S</span>
            <span class="letter">H</span>
            <span class="letter">I</span>
            <span class="letter">N</span>
            <span class="letter">G</span>
        </div>

        <div class="bounce" style="top: 200px; display: none">
            <span class="letter">小</span>
            <span class="letter">马</span>
            <span class="letter">哥</span>
            <span class="letter">赔</span>
            <span class="letter">钱</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, toRefs, computed } from 'vue'
    export default defineComponent({
        setup() {
            const state = reactive({
                pageX: 0,
                pageY: 0,
                offsetX: 0,
                offsetY: 0,
            })

            const halfWidth: number = document.documentElement.clientWidth / 2
            const halfHeight: number = document.documentElement.clientHeight / 2

            // const halfWidth: number = 1422 / 2;
            // const halfHeight: number = 924.6 / 2;

            const steps: Array<number> = [0.125, 0.25, 0.5, 0.75, 0.875, 0.9375, 0.96875, 1]
            let timer: any = 0

            const handleMove = (e: any) => {
                // if (timer) return;
                clearInterval(timer)

                const lastPageX = state.pageX
                const lastPageY = state.pageY
                const { pageX, pageY } = e
                const maxStep = 25
                const stepX = (pageX - lastPageX) / maxStep
                const stepY = (pageY - lastPageY) / maxStep
                let count = 1

                state.pageX = state.pageX + stepX
                state.pageY = state.pageY + stepY

                timer = setInterval(() => {
                    // count += n--;
                    count++
                    console.log(count)
                    state.pageX = state.pageX + stepX
                    state.pageY = state.pageY + stepY
                    if (count >= maxStep) {
                        console.log(pageX, state.pageX)
                        console.log(pageY, state.pageY)
                        clearInterval(timer)
                        timer = null
                    }
                }, 20)

                // let offsetX = (e.pageX - halfWidth) / halfWidth;
                // let offsetY = (e.pageY - halfHeight) / halfHeight;
                // state.offsetX = 2.5 * offsetX;
                // state.offsetY = 2.5 * offsetY;
                // console.log(
                //   `${state.offsetX.toFixed(2)}%`,
                //   `${state.offsetY.toFixed(2)}%`
                // );

                // let offsetX = (e.pageX - halfWidth) / halfWidth;
                // let offsetY = (e.pageY - halfHeight) / halfHeight;
                // state.offsetX = 2.5 * offsetX;
                // state.offsetY = 2.5 * offsetY;
                // console.log(
                //   `${state.offsetX.toFixed(2)}%`,
                //   `${state.offsetY.toFixed(2)}%`
                // );

                // clearInterval(timer);
                // count = 0;
                // let offsetX = (e.pageX - halfWidth) / halfWidth;
                // let offsetY = (e.pageY - halfHeight) / halfHeight;
                // state.offsetX = offsetX * steps[count];
                // state.offsetY = offsetY * steps[count];
                // timer = setInterval(() => {
                //   count++;
                //   state.offsetX = offsetX * steps[count];
                //   state.offsetY = offsetY * steps[count];
                //   if (count >= steps.length) {
                //     clearInterval(timer);
                //   }
                // }, 150);
            }

            const moveStyle = computed(() => {
                const offsetX = (2.5 * (state.pageX - halfWidth)) / halfWidth
                const offsetY = (2.5 * (state.pageY - halfHeight)) / halfHeight
                console.log(`${offsetX.toFixed(2)}%`, `${offsetY.toFixed(2)}%`)
                return {
                    transform: `translate(${offsetX}%, ${offsetY}%)`,
                }
            })

            return {
                ...toRefs(state),
                handleMove,
                moveStyle,
            }
        },
    })
</script>

<style lang="scss" scoped>
    .demo4-page {
        width: 100%;
        height: 100%;
        background-color: #666;
        position: relative;
    }

    .moving-title {
        width: 829px;
        height: 180px;
        position: absolute;
        left: 300px;
        top: 200px;
    }

    @keyframes bounce {
        0% {
            transform: translate3d(0, 0, 0);
            text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
        }
        100% {
            transform: translate3d(0, -1em, 0);
            text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
        }
    }
    .bounce {
        // display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        white-space: nowrap;
        position: absolute;
        left: 64px;
        top: 100px;
    }

    .letter {
        animation: bounce 0.75s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
        display: inline-block;
        transform: translate3d(0, 0, 0);
        margin-top: 0.5em;
        text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
        font-size: 16px;
        font-weight: bold;
        margin-left: 30px;
    }
    .letter:nth-child(1) {
        animation-delay: 0s;
        margin-left: 0;
    }

    .letter:nth-child(2) {
        animation-delay: 0.0833333333s;
    }

    .letter:nth-child(3) {
        animation-delay: 0.1666666667s;
    }

    .letter:nth-child(4) {
        animation-delay: 0.25s;
    }

    .letter:nth-child(5) {
        animation-delay: 0.3333333333s;
    }

    .letter:nth-child(6) {
        animation-delay: 0.4166666667s;
    }

    .letter:nth-child(7) {
        animation-delay: 0.5166666667s;
    }

    .letter:nth-child(8) {
        animation-delay: 0.6166666667s;
    }

    .letter:nth-child(9) {
        animation-delay: 0.7166666667s;
    }
</style>
