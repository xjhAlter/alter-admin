<template>
  <div class="page">
    <div class="page-scroll-number">
      <h1 class="page-title">滚动数字demo</h1>
      <div class="date-wrapper">
        <scroll-num v-for="(i,index) in year" :i="+i" :delay="(index + 1) / 2" :key="'' + count + index" color="orange" width="30px"></scroll-num>
        <span>-</span>
        <scroll-num v-for="(i,index) in month" :i="+i" :delay="index + 1" :key="'' + count + index" color="orange" width="30px"></scroll-num>
        <span>-</span>
        <scroll-num v-for="(i,index) in date" :i="+i" :delay="index + 1" :key="'' + count + index" color="orange" width="30px"></scroll-num>
      </div>

      <el-button @click="refresh" style="margin-top: 20px;">刷新</el-button>
      <div class="blog-container">
        <span class="blog-title">简易代码分析</span>
        <section class="blog-desc">
          html代码如下(样式代码略)：
        </section>
        <div class="hljs-code" v-highlight>
          <pre><code class="HTML">&lt;div&gt;
    &lt;ul&gt;
      &lt;li&gt;0&lt;&#47;li&gt;
      &lt;li&gt;1&lt;&#47;li&gt;
      &lt;li&gt;2&lt;&#47;li&gt;
      &lt;li&gt;3&lt;&#47;li&gt;
      &lt;li&gt;4&lt;&#47;li&gt;
      &lt;li&gt;5&lt;&#47;li&gt;
      &lt;li&gt;6&lt;&#47;li&gt;
      &lt;li&gt;7&lt;&#47;li&gt;
      &lt;li&gt;8&lt;&#47;li&gt;
      &lt;li&gt;9&lt;&#47;li&gt;
      &lt;li&gt;0&lt;&#47;li&gt;
    &lt;&#47;ul&gt;
&lt;&#47;div&gt;</code></pre>
        </div>
        <section class="blog-desc">
          通过两段动画实现(作用在ul元素上)：<br />
          1. 无限滚动
        </section>
        <div class="hljs-code" v-highlight>
          <pre><code class="CSS">@keyframes move {
  from {
    transform: translateY(-90%);
  }
  to {
    transform: translateY(1%);
  }
}</code></pre>
        </div>
        <section class="blog-desc">
          动画1的效果如下:
          <div class="demo-scroll-num">
            <ul class="demo-ani-1">
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
          </div>
        </section>
        <section class="blog-desc">
          2. 切换到目标数字并带有回弹效果<br />
          一共有11个数字，每一个数字的高度占比为9.09%
        </section>
        <div class="hljs-code" v-highlight>
          <pre><code class="CSS">@keyframes bounce-in-down {
  from {
    transform: translateY(calc(var(--i) * -9.09% - 7%)); /* --i为目标数字 */
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
}</code></pre>
        </div>
        <section class="blog-desc">
          动画2的效果如下,这里为了演示将animation-fill-mode设为infinite, 实际应用中要使用forwards
          <div class="demo-scroll-num" style="--i: 7;">
            <ul class="demo-ani-2">
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
          </div>
        </section>
        <section class="blog-desc">
          将两段动画一起使用
        </section>
        <div class="hljs-code" v-highlight>
          <pre><code class="CSS">ul {
  animation: move 0.3s linear infinite,
    bounce-in-down 1s 1s forwards; /* 1s 后执行第二段动画 */
}</code></pre>
        </div>
        <section class="blog-desc">
          最终获得滚动数字的效果
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 参考链接：
 * https://juejin.cn/post/6986453616517185567
 */
import { defineComponent, reactive, toRefs } from "vue";
import scrollNum from "@/components/scroll-num/index.vue";
export default defineComponent({
  name: "scrollNumberDemo",
  components: { scrollNum },
  setup() {
    const state = reactive({
      year: [""],
      month: [""],
      date: [""],
      count: 0,
    });

    const getRandom = (max: number) => {
      return "" + Math.floor(Math.random() * max);
    };

    const refresh = () => {
      if (state.count % 2 === 0) {
        const now = new Date();
        state.year = ("" + now.getFullYear()).split("");
        state.month = ("" + (now.getMonth() + 1)).split("");
        state.date = ("" + now.getDate()).split("");
        if (state.month.length < 2) state.month.unshift("0");
        if (state.date.length < 2) state.date.unshift("0");
      } else {
        state.year = state.year.map(() => {
          return getRandom(9);
        });
        state.month = state.month.map(() => {
          return getRandom(9);
        });
        state.date = state.date.map(() => {
          return getRandom(9);
        });
      }
      state.count++;
    };

    refresh();

    return {
      ...toRefs(state),
      refresh,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  background-color: #e3f9fd;
  overflow-y: auto;
}
.page-scroll-number {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  .date-wrapper {
    display: flex;
    align-items: center;
    color: orange;
    font-size: 30px;
    font-weight: bold;
  }

  .demo-scroll-num {
    width: 30px;
    height: 54px;
    color: orange;
    font-size: 36px;
    line-height: 54px;
    text-align: center;
    overflow: hidden;
    margin: 10px 0;

    ul {
      &.demo-ani-1 {
        animation: move 0.3s linear infinite;
      }
      &.demo-ani-2 {
        animation: bounce-in-down 1s 1s infinite;
      }
      &.demo-ani-3 {
        animation: move 0.3s linear infinite, bounce-in-down 1s 1s forwards;
      }
    }
  }
}

@keyframes move {
  from {
    transform: translateY(-90%);
  }
  to {
    transform: translateY(1%);
  }
}

@keyframes bounce-in-down {
  from {
    transform: translateY(calc(var(--i) * -9.09% - 7%)); /* --i为目标数字 */
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
</style>