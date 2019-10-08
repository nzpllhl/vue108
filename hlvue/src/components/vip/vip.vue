<template>
  <div>
    我是会员
    <h3 v-tack:left="rans">我是自定义指令</h3>
    <button @click="Mystyle">点我</button>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
    <div class="box" v-scroll="scrollLoad">
      <p>
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
        1111111111111111
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rans: 10
    };
  },
  methods: {
    Mystyle() {
      //alert(1);
      this.rans += 3;
    },
    scrollLoad() {
      //获取滚条的高度
      let scrollTop =
        document.documentElement.scrollTop ||
        Window.pageYOffet ||
        document.body.scrollTop;

      //获取文档的高度
      let bodyHeight =
        document.body.scrollHeight || document.documentElement.scrollHeight;
      //如果滚动条的高度+window的高度大于= body的高度-50
      if (scrollTop + window.innerHeight >= bodyHeight - 50) {
        //那就发起请求
        console.log("发送请求");
      }
    }
  }
};
</script>

<style scoped>
body {
  /* height: 1000px; */
}
</style>