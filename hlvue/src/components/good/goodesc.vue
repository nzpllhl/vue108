<template>
  <div class="goods_info">
    <h3>{{info.title}}</h3>
    <div>{{info.content}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.getdoosdes();
  },
  methods: {
    getdoosdes() {
      this.$axios.get("goodsjs").then(e => {
        this.info = e.data;
        console.log(e.data);
      });
    }
  }
};
</script>

<style lang="less">
.goods_info {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>