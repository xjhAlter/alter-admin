<template>
  <div class="page-demo1">
    <el-button @click="handleClick" type="primary">点击</el-button>
    <p>年份: {{year}}</p>
    <p>月份: {{month.val}}</p>
    <p>昵称: {{nickname}}</p>
    <p>年龄: {{age}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
export default defineComponent({
  name: "demo1",
  setup(props, context) {
    // props 不可以使用解构，会消除它的响应式
    // context 中有 attrs, emit, slots 属性
    console.log("----setup----");

    const year = ref(2021); // 可以处理基本类型，也可以处理对象的双向绑定
    const month = ref({ val: 1 });
    const user = reactive({ nickname: "xxx", age: 20 }); // 代理一个对象，但不能代理基本类型

    const handleClick = () => {
      year.value++; // ref的通过.value 访问
      month.value.val++;
      user.age++; // reactive的直接访问
      if (month.value.val > 12) {
        // 停止监听
        stopWatchRoom();
      }
    };

    const stopWatchRoom = watch(
      () => user.age, // 侦听user.age
      (newValue, oldValue) => {
        console.log("新值", newValue, "旧值", oldValue);
      }
      //   { deep: true } // 监听复杂的嵌套对象的数据变化
    );

    const data = {
      year,
      month,
      ...toRefs(user), // 使用toRefs,保持解构后数据的响应式
      handleClick,
    };

    return data;
  },
  beforeCreate() {
    console.log("----beforeCreate----"); // setup 在 beforeCreate 之前执行
  },
});
</script>

<style lang="scss" scoped>
.page-demo1 {
  padding: 20px;
}
</style>