<template>
  <div class="lunbo">
    <mt-swipe :auto="4000" style="height:200px">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "Mysewipt",
  data() {
    return {};
  },
  props: ["lunbotuList"]
};
</script>

<style  scoped>
.lunbo img {
  height: 100%;
  width: 100%;
}
</style>