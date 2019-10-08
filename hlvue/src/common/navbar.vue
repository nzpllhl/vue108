<template>
  <div class="header active">
    <h3 @click="goBack" class="back"><</h3>
    <h3 class="desc_title">{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.header {
  font-size: 16px;
  color: palevioletred;
  height: 40px;
  width: 100%;
  line-height: 40px;

  /*  felx布局直接在需要的元素身上加 */
  display: flex;
  justify-content: space-between;
}
.active {
  background-color: powderblue;
}
</style>