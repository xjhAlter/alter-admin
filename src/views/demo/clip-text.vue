<template>
    <div class="page">
        <div class="page-clip-text">
            <h1 class="page-title">图片动效1demo</h1>
            <div class="img-wrapper">
                <img src="/src/assets/img/common/prepare-to-fight.png" alt="" class="img0" />
                <img src="/src/assets/img/common/prepare-to-fight.png" alt="" class="img1" />
                <img src="/src/assets/img/common/prepare-to-fight.png" alt="" class="img2" />
                <img src="/src/assets/img/common/prepare-to-fight.png" alt="" class="img3" />
            </div>
            <div class="blog-container">
                <span class="blog-title">简易代码分析</span>
                <section class="blog-desc">
                    由4张图片堆叠而成，底部的图片正常显示，其余3张带有动画效果，所以每张图片都要设置成绝对定位，而父元素要设置非static定位<br />
                    使用 clip-path 属性裁剪图片,效果如图
                </section>
                <div class="hljs-code" v-highlight>
                    <pre><code class="CSS">clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);</code></pre>
                </div>
                <section class="blog-desc">
                    <div class="img-wrapper">
                        <img
                            src="/src/assets/img/common/prepare-to-fight.png"
                            alt=""
                            class="img4"
                        />
                    </div>
                </section>
                <section class="blog-desc"> 通过动画将实现clip-path的变化 </section>
                <div class="hljs-code" v-highlight>
                    <pre><code class="CSS">@keyframes clip {
  0% {
    opacity: 0.5;
    transform: translate3d(6px, 0, 0);
    clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
  }
  3% {
    clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
  }
  5% {
    clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
  }
  7% {
    clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
  }
  9% {
    clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
  }
  11% {
    clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
  }
  13% {
    clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
  }
  15% {
    clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
  }
  17% {
    clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
  }
  19% {
    clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
  }
  20% {
    clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
  }
  21.9% {
    opacity: 0.5;
    transform: translate3d(6px, 0, 0);
  }
  22%,
  to {
    opacity: 0;
    transform: translateZ(0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}</code></pre>
                </div>
                <section class="blog-desc">
                    <div class="img-wrapper">
                        <img
                            src="/src/assets/img/common/prepare-to-fight.png"
                            alt=""
                            class="img3"
                        />
                    </div>
                    最后3张图片分别设置不同帧数时的clip-path
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'clipTextDemo',
    })
</script>

<style lang="scss" scoped>
    .page {
        background-color: #e3f9fd;
        overflow-y: auto;
    }
    .page-clip-text {
        width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .img-wrapper {
        position: relative;
        width: 415px;
        height: 90px;
        img {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .img1 {
            animation: clip1 4s 0s linear infinite;
        }
        .img2 {
            animation: clip2 4s 0s linear infinite;
        }
        .img3 {
            animation: clip3 4s 0s linear infinite;
        }
        .img4 {
            clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
        }
    }

    @keyframes clip1 {
        0% {
            opacity: 0.5;
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
            -webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
            clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
        }
        2% {
            -webkit-clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
            clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
        }
        4% {
            -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
            clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
        }
        6% {
            -webkit-clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
            clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
        }
        8% {
            -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
            clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
        }
        10% {
            -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
            clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
        }
        12% {
            -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
            clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
        }
        14% {
            -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
            clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
        }
        16% {
            -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
            clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
        }
        18% {
            -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
            clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
        }
        20% {
            -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
            clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
        }
        21.9% {
            opacity: 0.5;
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
        }
        22%,
        to {
            opacity: 0;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
        }
    }
    @keyframes clip2 {
        0% {
            opacity: 0.5;
            -webkit-transform: translate3d(9px, 0, 0);
            transform: translate3d(9px, 0, 0);
            -webkit-clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
            clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
        }
        3% {
            -webkit-clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
            clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
        }
        5% {
            -webkit-clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
            clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
        }
        7% {
            -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
            clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
        }
        9% {
            -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
            clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
        }
        11% {
            -webkit-clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
            clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
        }
        13% {
            -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
            clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
        }
        15% {
            -webkit-clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
            clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
        }
        17% {
            -webkit-clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
            clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
        }
        19% {
            -webkit-clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
            clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
        }
        20% {
            -webkit-clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
            clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
        }
        21.9% {
            opacity: 0.5;
            -webkit-transform: translate3d(9px, 0, 0);
            transform: translate3d(9px, 0, 0);
        }
        22%,
        to {
            opacity: 0;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
        }
    }
    @keyframes clip3 {
        0% {
            opacity: 0.5;
            -webkit-transform: translate3d(6px, 0, 0);
            transform: translate3d(6px, 0, 0);
            -webkit-clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
            clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
        }
        3% {
            -webkit-clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
            clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
        }
        5% {
            -webkit-clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
            clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
        }
        7% {
            -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
            clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
        }
        9% {
            -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
            clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
        }
        11% {
            -webkit-clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
            clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
        }
        13% {
            -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
            clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
        }
        15% {
            -webkit-clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
            clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
        }
        17% {
            -webkit-clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
            clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
        }
        19% {
            -webkit-clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
            clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
        }
        20% {
            -webkit-clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
            clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
        }
        21.9% {
            opacity: 0.5;
            -webkit-transform: translate3d(6px, 0, 0);
            transform: translate3d(6px, 0, 0);
        }
        22%,
        to {
            opacity: 0;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
        }
    }
</style>
