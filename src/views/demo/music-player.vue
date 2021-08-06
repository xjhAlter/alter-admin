<template>
  <div class="page">
    <div class="page-music-player">
      <audio src="/src/assets/music/坂本真綾 - 色彩.mp3" controls id="music" ref="music"></audio>
      <div class="player-wrapper">
        <div>
          <i v-if="status === 1" class="el-icon-video-pause" @click="pause"></i>
          <i v-else class="el-icon-video-play" @click="play"></i>
        </div>
        <span class="music-duration">{{currentProgress}}</span>
        <div class="music-progress-wrapper" ref="musicProgress" @click="onProgressClick">
          <div id="music-progress"></div>
        </div>
        <span class="music-duration">{{totalDuration}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
} from "vue";

export default defineComponent({
  name: "musicPlayerDemo",
  setup() {
    const music = ref(null);
    const musicProgress = ref(null);
    const state = reactive({
      canplay: false,
      duration: 0, // 歌曲时长
      status: 0, // 0 - 未播放, 1 - 播放中, 2 - 暂停中
      currentTime: 0, // 当前播放进度
    });
    let tm: any = null;

    onMounted(() => {
      music.value.addEventListener("canplay", function () {
        //监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
        state.canplay = true;
        state.duration = music.value.duration;
      });

      document.addEventListener("visibilitychange", onVisibilitychange);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("visibilitychange", onVisibilitychange);
    });

    // 获取分钟
    const getMinute = (time: number) => {
      const m = Math.floor(time / 60);
      return m > 9 ? m : "0" + m;
    };

    // 获取秒钟
    const getSecond = (time: number) => {
      const m = Math.floor(time / 60);
      const s = Math.floor((time / 60 - m) * 60);
      return s > 9 ? s : "0" + s;
    };

    // 音频总时长
    const totalDuration = computed(() => {
      return getMinute(state.duration) + ":" + getSecond(state.duration);
    });

    // 当前播放进度
    const currentProgress = computed(() => {
      return getMinute(state.currentTime) + ":" + getSecond(state.currentTime);
    });

    // 更新已播放时间
    const updateCurrentTime = () => {
      state.currentTime = music.value.currentTime;
    };

    // 根据音频播放时间更新进度条动画
    const updateProgress = () => {
      // @ts-ignore
      tm = new TweenMax(
        "#music-progress",
        state.duration - music.value.currentTime,
        {
          width: "100%",
          startAt: {
            width: (music.value.currentTime / state.duration) * 100 + "%",
          },
          // @ts-ignore
          ease: Power0.easeNone,
          onUpdate: updateCurrentTime,
          onComplete: function () {
            state.status = 0;
          },
        }
      );
    };

    // 播放/继续播放
    const play = () => {
      if (state.canplay && state.status !== 1) {
        if (state.status === 0) {
          music.value.currentTime = 0;
          updateProgress();
        } else if (state.status === 2) {
          tm.resume();
        }
        music.value.play();
        state.status = 1;
      }
    };

    // 暂停
    const pause = () => {
      if (state.status === 1) {
        music.value.pause();
        state.status = 2;
        tm.pause();
      }
    };

    // 点击进度条
    const onProgressClick = (el: any) => {
      if (state.status === 1) {
        const { width } = musicProgress.value.getBoundingClientRect();
        music.value.currentTime = (state.duration * el.offsetX) / width;
        updateProgress();
      }
    };

    // 切换浏览器窗口时更新动画(当前窗口隐藏时动画没有执行)
    const onVisibilitychange = () => {
      if (document.visibilityState === "visible" && state.status === 1) {
        updateProgress();
      }
    };

    return {
      music,
      musicProgress,
      ...toRefs(state),
      totalDuration,
      currentProgress,
      play,
      pause,
      onProgressClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  background-color: #000;
  overflow-y: auto;
}
.page-music-player {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  color: #fff;
  cursor: pointer;
  font-size: 40px;
}

.player-wrapper {
  display: flex;
  align-items: center;
  margin-top: 20px;
  .music-duration {
    display: inline-block;
    width: 46px;
    text-align: center;
    color: #fff;
    margin-left: 20px;
  }
}

.music-progress-wrapper {
  width: 315px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-left: 20px;
  cursor: pointer;
  #music-progress {
    width: 0;
    height: 5px;
    background: #fff;
    margin-top: -1px;
  }
}
</style>