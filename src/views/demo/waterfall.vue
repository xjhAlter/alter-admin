<template>
  <div class="page" @scroll="handleScroll">
    <div class="page-waterfall">
      <h1 class="page-title">瀑布流demo</h1>
      <div class="waterfall-wrapper">
        <div v-for="item in imgs" :key="item.index" class="img-wrapper" :style="{width: colWidth + 'px', left: item.left + 'px', top: item.top + 'px'}">
          <img :src="item.url" alt="" v-show="item.height">
          <div class="index-wrapper" v-if="item.height">{{item.index}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 瀑布流的一个demo
 * 通过绝对定位进行图片定位
 */
import { defineComponent, reactive, toRefs, onMounted } from "vue";

export default defineComponent({
  name: "waterfallDemo",
  setup() {
    const config = reactive({
      colWidth: 275, // 列宽(图片宽度)
      cols: 4, // 列数
      mr: 20, // margin-right
      mb: 20, // margin-bottom
      size: 16, // 每次获取的图片数量
    });

    interface IImg {
      index: number;
      url: string;
      height?: number;
      top?: number;
      left?: number;
    }
    const imgs: Array<IImg> = reactive([]);
    let minHeight: number = Infinity;
    let imgLock = false;

    onMounted(() => {
      getImages();
    });

    async function getImages() {
      imgLock = true;
      const length = imgs.length;
      for (let i = 0; i < config.size; i++) {
        const item: IImg = {
          index: length + i,
          url: `https://picsum.photos/${Math.round(
            Math.random() * 800 + 200
          )}/${Math.round(Math.random() * 500 + 300)}?random=${i}`,
        };
        imgs.push(item);
      }

      for (let i = length; i < imgs.length; i++) {
        let item = imgs[i];
        let el = document.createElement("img");
        el.src = item.url;

        /**
         * 需要等待前面的图片加载完，效果一般
         */
        await getImageSize(el)
          .then((res: any) => {
            const { naturalWidth, naturalHeight } = res;
            item.height = Number(
              ((config.colWidth / naturalWidth) * naturalHeight).toFixed(2)
            ); // 按比例换算图片高度
            const rowIndex = Math.floor(i / config.cols); // 计算行坐标
            const colIndex = i % config.cols; // 计算列坐标

            item.left = colIndex * (config.colWidth + config.mr);
            let top = 0;
            let curIndex = colIndex;
            while (curIndex < i) {
              top += imgs[curIndex].height || 0; // 同一列的高度累加
              curIndex += config.cols;
            }
            item.top = top + rowIndex * config.mb; // 加上行与行之间的间隙
          })
          .catch(console.error);
      }

      minHeight = Infinity;
      imgs.slice(imgs.length - 4).forEach((item) => {
        const height = (item.height || 0) + (item.top || 0);
        if (height < minHeight) {
          minHeight = height;
        }
      });
      imgLock = false;
    }

    function getImageSize(img: any) {
      if (img.complete) {
        return Promise.resolve({
          naturalHeight: img.naturalHeight,
          naturalWidth: img.naturalWidth,
          height: img.height,
          width: img.width,
        });
      } else {
        return new Promise((resolve, reject) => {
          img.addEventListener("load", () => {
            resolve({
              naturalHeight: img.naturalHeight,
              naturalWidth: img.naturalWidth,
              height: img.height,
              width: img.width,
            });
          });
        });
      }
    }

    const handleScroll = (e: any) => {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;
      if (
        !imgLock &&
        (scrollTop > minHeight ||
          minHeight < offsetHeight ||
          offsetHeight + scrollTop - scrollHeight >= -1)
      ) {
        getImages();
      }
    };

    return {
      ...toRefs(config),
      imgs,
      handleScroll,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  background-color: #e3f9fd;
  overflow-y: auto;
}
.page-waterfall {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.waterfall-wrapper {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .img-wrapper {
    position: absolute;
    img {
      width: 100%;
    }
    .index-wrapper {
      min-width: 20px;
      height: 20px;
      padding: 0 4px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 20px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      background-color: rgba($color: #000, $alpha: 0.5);
    }
  }
}
</style>