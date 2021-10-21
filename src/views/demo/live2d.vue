<template>
    <div class="page live2d">
        <div class="Canvas" id="L2dCanvas"></div>
    </div>
</template>

<script lang="ts">
    /**
     * 在网页上添加 moc3 格式的Live2d模型
     * 参考文档
     * Live2dV3: https://github.com/HCLonely/Live2dV3
     * pixiJS: https://pixijs.com
     */
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'live2d',
        setup() {
            onMounted(() => {
                // @ts-ignore
                const model = new l2dViewer({
                    el: document.getElementById('L2dCanvas'),
                    basePath: '/src/assets/model', // 模型根目录
                    modelName: 'weilai', // 模型目录
                    width: 1500,
                    height: 900,
                    sizeLimit: false, // 当窗口大小小于设置的宽或高时不加载模型
                    mobileLimit: false, // 移动端不加载模型
                    sounds: [], // 触摸播放声音
                })

                // method
                // loadModel(modelName?)
                // 重新加载/更换模型
            })

            return {}
        },
    })
</script>

<style lang="scss" scoped>
    .page-demo5 {
    }
</style>
