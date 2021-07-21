<template>
  <div class="scroll-num" :style="{'--i': i, '--delay': delay, '--width': width,'--height': height, '--color': color}">
    <ul ref="ul">
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>0</li>
    </ul>
    <!-- svg增加模糊效果  -->
    <svg width="0" height="0">
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="`0 ${blur}`" />
      </filter>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
export default defineComponent({
  props: {
    i: {
      type: Number,
      default: 0,
      validator: (v: any) => {
        return v < 10 && v >= 0 && Number.isInteger(v);
      },
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#333",
    },
    delay: {
      type: Number,
      default: 1,
    },
    blur: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    let timer: any = ref(0);
    const ul = ref(null);
    onMounted(() => {
      const ua = navigator.userAgent.toLowerCase();
      const testUA = (regexp: any) => regexp.test(ua);
      const isSafari = testUA(/safari/g) && !testUA(/chrome/g);

      // Safari 浏览器兼容
      if (isSafari) {
        timer.value = setTimeout(() => {
          (ul.value as any).setAttribute(
            "style",
            "animation:none;transform:translateY(calc(var(--i)*-9.09%))"
          );
        }, props.delay * 1000);
      }
    });

    onBeforeUnmount(() => {
      clearTimeout(timer.value);
    });

    return {
      timer,
      ul,
    };
  },
});
</script>

<style lang="scss" scoped>
.scroll-num {
  width: var(--width, 20px);
  height: var(--height, calc(var(--width, 20px) * 1.8));
  color: var(--color, #333);
  font-size: var(--height, calc(var(--width, 20px) * 1.2));
  line-height: var(--height, calc(var(--width, 20px) * 1.8));
  text-align: center;
  overflow: hidden;
  animation: enhance-bounce-in-down 1s calc(var(--delay) * 1s) forwards;
}

ul {
  /** 通过两段动画实现 */
  animation: move 0.3s linear infinite,
    bounce-in-down 1s calc(var(--delay) * 1s) forwards;
}

/** 一直滚动 */
@keyframes move {
  from {
    transform: translateY(-90%);
    filter: url(#blur);
  }
  to {
    transform: translateY(1%);
    filter: url(#blur);
  }
}

/** 定位到对应数字的位置，回弹效果 */
/** 一个11个元素，每个元素高度为总高度的9.09% */
@keyframes bounce-in-down {
  from {
    transform: translateY(calc(var(--i) * -9.09% - 7%));
    filter: none;
  }
  25% {
    transform: translateY(calc(var(--i) * -9.09% + 3%));
  }
  50% {
    transform: translateY(calc(var(--i) * -9.09% - 1%));
  }
  70% {
    transform: translateY(calc(var(--i) * -9.09% + 0.6%));
  }
  85% {
    transform: translateY(calc(var(--i) * -9.09% - 0.3%));
  }
  to {
    transform: translateY(calc(var(--i) * -9.09%));
  }
}

@keyframes enhance-bounce-in-down {
  25% {
    transform: translateY(8%);
  }
  50% {
    transform: translateY(-4%);
  }
  70% {
    transform: translateY(2%);
  }
  85% {
    transform: translateY(-1%);
  }
  to {
    transform: translateY(0);
  }
}
</style>