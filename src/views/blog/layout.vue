<template>
  <div class="page">
    <div class="page-layout">
      <h1 class="page-title">布局</h1>
      <div class="blog-container">
        <span class="blog-title">全屏布局</span>
        <section class="blog-desc">
          <div class="desc-wrapper">
            由顶部、底部和主体三部分组成,特点是三部分左右满屏拉伸,顶部底部高度固定,主体高度自适应<br /><br />
            <span class="color-red">1. position + left/right/top/bottom</span><br />
            三部分统一声明 left:0 和 right:0 将其左右满屏拉伸,<br />
            顶部和底部分别声明top:0 和 bottom: 0，固定高度值,<br />
            主体的top 和 bottom 分别声明为顶部高度和底部高度。<br /><br />
            <span class="color-red">2. flex</span><br />
            使用display: flex; flex-direction: column; 来布局<br />
          </div>
          <div class="window-wrapper">
            <div class="fullscreen-layout">
              <header></header>
              <main></main>
              <footer></footer>
            </div>
          </div>
        </section>
        <span class="blog-title">两列布局</span>
        <section class="blog-desc">
          <div class="desc-wrapper">
            由左右两列组成, 特点是一列宽度固定,另一列宽度自适应, 两列的高度固定且相等<br /><br />
            <span class="color-red">1. float + margin-left/right</span><br />
            左列声明float: left 并固定宽度, 右列声明一个margin-left, 大小为左列的宽度<br /><br />
            <span class="color-red">2. overflow + float</span><br />
            左列声明float: left 并固定宽度, 右列声明overflow: hidden, 使其形成BFC区域与外界隔离<br /><br />
            <span class="color-red">3. flex</span><br />
            左列固定宽度, 右列声明flex: 1 自适应宽度
          </div>
          <div class="window-wrapper">
            <div class="two-column-layout">
              <div class="left"></div>
              <div class="right"></div>
            </div>
          </div>
        </section>
        <span class="blog-title">三列布局</span>
        <section class="blog-desc">
          <div class="desc-wrapper">
            由左中右三列组成, 特点是连续两列宽度固定,剩余一列宽度自适应, 三列的高度固定且相等<br /><br />
            <span class="color-red">1. overflow + float</span><br />
            前两列声明float: left 并固定宽度, 最后一列声明overflow: hidden, 使其形成BFC区域与外界隔离<br /><br />
            <span class="color-red">2. flex</span><br />
            前两列固定宽度, 最后一列声明flex: 1 自适应宽度
          </div>
          <div class="window-wrapper">
            <div class="three-column-layout">
              <div class="left"></div>
              <div class="center"></div>
              <div class="right"></div>
            </div>
          </div>
        </section>
        <span class="blog-title">圣杯布局/双飞翼布局</span>
        <section class="blog-desc">
          <div class="desc-wrapper">
            由左中右三列组成, 特点是左右两列宽度固定,中间一列宽度自适应, 三列的高度固定且相等<br /><br />
            <span class="color-red">1. 圣杯布局 float + margin-left/right + padding-left/right</span><br />
            左列声明左浮动及负宽度的margin-left, 右列声明右浮动及负宽度的margin-right<br /><br />
            <span class="color-red">2. 双飞翼布局 float + margin-left/right</span><br />
            左右列分别声明左右浮动,中间列声明左右两列宽度的margin<br /><br />
            <span class="color-red">3. 圣杯布局/双飞翼布局 flex</span><br />
            左右两列宽度固定，中间列宽度自适应 flex: 1
          </div>
          <div class="window-wrapper">
            <div class="grail-layout-x">
              <div class="left"></div>
              <div class="right"></div>
              <div class="center"></div>
            </div>
          </div>
        </section>
        <span class="blog-title">均分布局</span>
        <section class="blog-desc">
          <div class="desc-wrapper">
            由多列组成, 特点是每列宽度相等, 每列高度固定且相等<br /><br />
            <span class="color-red">1. float + width</span><br />
            声明为左浮动且宽度相等<br /><br />
            <span class="color-red">2. flex</span><br />
            每列声明flex: 1
          </div>
          <div class="window-wrapper">
            <div class="average-layout">
              <div class="one"></div>
              <div class="two"></div>
              <div class="three"></div>
              <div class="four"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 参考链接:
 * https://juejin.cn/post/6986873449721364510
 */
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "layoutBlog",
});
</script>

<style lang="scss" scoped>
.page {
  background-color: #e3f9fd;
  overflow-y: auto;
}
.page-layout {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.blog-desc {
  display: flex;
  .desc-wrapper {
    width: 720px;
    margin-right: 40px;
  }
}

/** 模拟浏览器窗口 */
.window-wrapper {
  width: 400px;
  height: 400px;
}

/** 全屏布局 position + left/right/top/bottom */
.fullscreen-layout {
  width: 400px;
  height: 400px;
  position: relative;
  header,
  footer,
  main {
    /** left 和 right 设为0将左右满屏拉伸 */
    position: absolute;
    left: 0;
    right: 0;
  }
  header {
    top: 0;
    height: 50px;
    background-color: #f66;
  }
  footer {
    bottom: 0;
    height: 50px;
    background-color: #66f;
  }
  main {
    top: 50px;
    bottom: 50px;
    background-color: #3c9;
  }
}

/** 两列布局 overflow + float */
.two-column-layout {
  width: 400px;
  height: 400px;
  .left {
    float: left;
    width: 100px;
    height: 100%;
    background-color: #f66;
  }
  .right {
    overflow: hidden;
    height: 100%;
    background-color: #66f;
  }
}

/** 三列布局 overflow + float */
.three-column-layout {
  width: 400px;
  height: 400px;
  .left {
    float: left;
    width: 50px;
    height: 100%;
    background-color: #f66;
  }
  .center {
    float: left;
    width: 100px;
    height: 100%;
    background-color: #66f;
  }
  .right {
    overflow: hidden;
    height: 100%;
    background-color: #3c9;
  }
}

/** 圣杯布局 float + margin-left/right + padding-left/right */
.grail-layout-x {
  padding: 0 100px;
  width: 400px;
  height: 400px;
  .left {
    float: left;
    margin-left: -100px;
    width: 100px;
    height: 100%;
    background-color: #f66;
  }
  .right {
    float: right;
    margin-right: -100px;
    width: 100px;
    height: 100%;
    background-color: #66f;
  }
  .center {
    height: 100%;
    background-color: #3c9;
  }
}

/** 均分布局 float + width */
.average-layout {
  width: 400px;
  height: 400px;
  div {
    float: left;
    width: 25%;
    height: 100%;
  }
  .one {
    background-color: #f66;
  }
  .two {
    background-color: #66f;
  }
  .three {
    background-color: #f90;
  }
  .four {
    background-color: #09f;
  }
}
</style>