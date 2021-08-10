<template>
    <el-scrollbar
        ref="scrollContainer"
        :vertical="false"
        class="scroll-container"
        @wheel.prevent="handleScroll"
    >
        <slot />
    </el-scrollbar>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref, computed, onBeforeUnmount } from 'vue'
    export default defineComponent({
        name: 'ScrollPane',
        props: {
            tags: {
                required: true,
            },
        },
        setup(props, { emit }) {
            const tagAndTagSpacing = 4
            const scrollContainer = ref()
            const scrollWrapper: any = computed(() => {
                return scrollContainer.value.wrap
            })
            onMounted(() => {
                scrollWrapper.value.addEventListener('scroll', emitScroll, true)
            })

            onBeforeUnmount(() => {
                scrollWrapper.value.removeEventListener('scroll', emitScroll)
            })

            const handleScroll = (e: any) => {
                const eventDelta = e.wheelDelta || -e.deltaY * 40
                const $scrollWrapper = scrollWrapper.value
                $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
            }

            const emitScroll = () => {
                emit('scroll')
            }

            const moveToTarget = (currentTag: any) => {
                const $container = scrollContainer.value.$el
                const $containerWidth = $container.offsetWidth
                const $scrollWrapper = scrollWrapper.value
                const tagList: any = props.tags

                // 第一个标签--最后一个标签
                let firstTag = null
                let lastTag = null
                if (tagList.length > 0) {
                    firstTag = tagList[0]
                    lastTag = tagList[tagList.length - 1]
                }

                if (firstTag === currentTag) {
                    $scrollWrapper.scrollLeft = 0
                } else if (lastTag === currentTag) {
                    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
                } else {
                    // find preTag and nextTag
                    const currentIndex = tagList.findIndex((item: any) => item === currentTag)
                    const prevTag = tagList[currentIndex - 1]
                    const nextTag = tagList[currentIndex + 1]

                    // the tag's offsetLeft after of nextTag
                    const afterNextTagOffsetLeft =
                        nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

                    // the tag's offsetLeft before of prevTag
                    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

                    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
                        $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
                    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
                        $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
                    }
                }
            }
            return {
                scrollContainer,
                handleScroll,
                moveToTarget,
            }
        },
    })
</script>

<style lang="scss" scoped>
    .scroll-container {
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        width: 100%;

        .el-scrollbar__bar {
            bottom: 0px;
        }
        .el-scrollbar__wrap {
            height: 49px;
        }
    }
</style>
