<template>
  <div class="page page-home" ref="home" @mousemove="handleMouseMove">
    <div class="artifact-item" v-for="(item,index) in artifactImg" :key="index">
      <div class="item-inner">
        <div class="img-container" :style="moveStyle">
          <div class="img-wrapper" :style="moveStyle">
            <img :src="item" alt="" class="artifact-img" />
          </div>
        </div>
      </div>
    </div>
    <div class="bounce">
      <span class="letter">A</span>
      <span class="letter">L</span>
      <span class="letter">T</span>
      <span class="letter">E</span>
      <span class="letter">R</span>
      <span class="letter">-</span>
      <span class="letter">A</span>
      <span class="letter">D</span>
      <span class="letter">M</span>
      <span class="letter">I</span>
      <span class="letter">N</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, ref } from "vue";

export default defineComponent({
  name: "home",
  setup() {
    const home = ref(null);
    const artifactImg = ref([
      "/src/assets/img/artifacts/fire.png",
      "/src/assets/img/artifacts/water.png",
      "/src/assets/img/artifacts/wind.png",
      "/src/assets/img/artifacts/thunder.png",
      "/src/assets/img/artifacts/ice.png",
      "/src/assets/img/artifacts/geo.png",
      "/src/assets/img/artifacts/gladiatus.png",
      "/src/assets/img/artifacts/orchestra.png",
      "/src/assets/img/artifacts/girl.png",
    ]);
    const moveState = reactive({
      offsetX: 0,
      offsetY: 0,
      pageX: 0,
      pageY: 0,
      timer: 0,
      step: 25,
      paceX: 0,
      paceY: 0,
      count: 1,
      delay: 20,
    });

    const handleMouseMove = (e: any) => {
      clearInterval(moveState.timer);
      const { pageX, pageY } = e;
      moveState.paceX = (pageX - moveState.pageX) / moveState.step;
      moveState.paceY = (pageY - moveState.pageY) / moveState.step;
      moving();
      moveState.count = 1;
      // @ts-ignore
      moveState.timer = setInterval(() => {
        moving();
        moveState.count++;
        if (moveState.count >= moveState.step) {
          clearInterval(moveState.timer);
          moveState.timer = 0;
        }
      }, moveState.delay);
    };

    const moving = function () {
      moveState.pageX += moveState.paceX;
      moveState.pageY += moveState.paceY;
      const { width, height, left, top } = (
        home.value as any
      ).getBoundingClientRect();
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      moveState.offsetX =
        (4.5 * (moveState.pageX - left - halfWidth)) / halfWidth;
      moveState.offsetY =
        (4.5 * (moveState.pageY - top - halfHeight)) / halfHeight;
    };

    const moveStyle = computed(() => {
      return {
        transform: `translate(${moveState.offsetX}%, ${moveState.offsetY}%)`,
      };
    });

    return {
      artifactImg,
      ...toRefs(moveState),
      home,
      handleMouseMove,
      moveStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-home {
  overflow: hidden;
  background-image: url("/src/assets/img/common/home-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.artifact-item {
  width: 20%;
  height: 20%;
  z-index: 3;
  position: absolute;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transition-delay: 25ms;
  transition-delay: 25ms;

  &:nth-child(1) {
    left: 10%;
    top: 10%;
  }

  &:nth-child(2) {
    left: 80%;
    top: 55%;
  }

  &:nth-child(3) {
    left: 60%;
    top: 30%;
  }

  &:nth-child(4) {
    left: 85%;
    top: 15%;
  }

  &:nth-child(5) {
    left: 70%;
    top: 70%;
  }

  &:nth-child(6) {
    left: 35%;
    top: 60%;
  }

  &:nth-child(7) {
    left: 20%;
    top: 45%;
  }

  &:nth-child(8) {
    left: 5%;
    top: 75%;
  }

  &:nth-child(9) {
    left: 45%;
    top: 5%;
  }

  .item-inner {
    position: absolute;
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    .img-container {
      position: absolute;
      width: 50%;
      height: 0;
      padding-top: 50%;

      .img-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        .artifact-img {
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease-in-out,
            -webkit-transform 0.3s ease-in-out;
          cursor: pointer;
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  white-space: nowrap;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;

  .letter {
    animation: bounce 1s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
    display: inline-block;
    transform: translate3d(0, 0, 0);
    margin-top: 0.5em;
    text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
    font-size: 16px;
    font-weight: bold;
    margin-left: 30px;

    &:nth-child(1) {
      animation-delay: 0s;
      margin-left: 0;
    }

    &:nth-child(2) {
      animation-delay: 0.0833333333s;
    }

    &:nth-child(3) {
      animation-delay: 0.1666666667s;
    }

    &:nth-child(4) {
      animation-delay: 0.25s;
    }

    &:nth-child(5) {
      animation-delay: 0.3333333333s;
    }

    &:nth-child(6) {
      animation-delay: 0.4166666667s;
    }

    &:nth-child(7) {
      animation-delay: 0.5166666667s;
    }

    &:nth-child(8) {
      animation-delay: 0.6166666667s;
    }

    &:nth-child(9) {
      animation-delay: 0.7166666667s;
    }

    &:nth-child(10) {
      animation-delay: 0.8166666667s;
    }

    &:nth-child(11) {
      animation-delay: 0.9166666667s;
    }
  }
}
</style>