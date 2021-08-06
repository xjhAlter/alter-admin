<template>
  <div class="page">
    <div class="page-digital-char-rain">
      <h1 class="page-title">字符雨demo</h1>
      <div class="rain-wrapper">
        <p v-for="n in 30" :key="n"></p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 参考链接：
 * https://juejin.cn/post/6991657194282450951
 */
import { defineComponent } from "vue";

export default defineComponent({
  name: "digitalCharRainDemo",
});
</script>

<style lang="scss" scoped>
.page {
  background-color: #e3f9fd;
  overflow-y: auto;
}
.page-digital-char-rain {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.rain-wrapper {
  background-color: #000;
  display: flex;
}

$str: "ぁぃぅぇぉかきくけこんさしすせそた◁▣▤▥▦▧♂♀♥☻►◄▧▨♦ちつってとゐなにぬねのはひふへほゑまみむめもゃゅょゎをァィゥヴェォカヵキクケヶコサシスセソタチツッテトヰンナニヌネノハヒフヘホヱマミムメモャュョヮヲㄅㄉㄓㄚㄞㄢㄦㄆㄊㄍㄐㄔㄗㄧㄛㄟㄣㄇㄋㄎㄑㄕㄘㄨㄜㄠㄤㄈㄏㄒㄖㄙㄩㄝㄡㄥabcdefghigklmnopqrstuvwxyz123456789%@#$<>^&*_+";
$length: str-length($str);
$n: 50;
$animationTime: 4;
$perColumnNums: 25;

@function randomChar() {
  $r: random($length);
  @return str-slice($str, $r, $r);
}

@function randomChars($number) {
  $value: "";

  @if $number > 0 {
    @for $i from 1 through $number {
      $value: $value + randomChar();
    }
  }
  @return $value;
}

p {
  position: relative;
  width: 4vh;
  height: 80vh;
  text-align: center;
  font-size: 4vh;
  word-break: break-all;
  white-space: pre-wrap;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
  }
}

@for $i from 0 through $n {
  $content: randomChars($perColumnNums);
  $contentNext: randomChars($perColumnNums);
  $delay: random($n);
  $randomAnimationTime: #{$animationTime + random(20) * 0.1 - 1}s;

  p:nth-child(#{$i})::before {
    content: $content;
    color: rgb(179, 255, 199);
    text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 5px currentColor,
      0 0 10px currentColor;
    animation: typing-#{$i}
      $randomAnimationTime
      steps(20, end)
      #{$delay *
      0.1s *
      -1}
      infinite;
    z-index: 1;
  }

  p:nth-child(#{$i})::after {
    $alpha: random(40) * 0.01 + 0.6;
    content: "";
    background: linear-gradient(
      rgba(0, 0, 0, $alpha),
      rgba(0, 0, 0, $alpha),
      rgba(0, 0, 0, $alpha),
      transparent 75%,
      transparent
    );
    background-size: 100% 220%;
    background-repeat: no-repeat;
    animation: mask
      $randomAnimationTime
      infinite
      #{($delay - 2) *
      0.1s *
      -1}
      linear;
    z-index: 2;
  }

  @keyframes typing-#{$i} {
    0% {
      height: 0;
    }
    25% {
      height: 100%;
    }
    100% {
      height: 100%;
      content: $contentNext;
    }
  }
}

@keyframes mask {
  0% {
    background-position: 0 220%;
  }
  30% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 0%;
  }
}
</style>