
<template>
  <div class="title">
    <mt-header fixed title="海丽项目" class="header">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>
<script>
//显示头部的组件公共头部的组件
export default {
  props: ["til"]
};
</script>

<style scoped >
.header {
  background-color: mediumvioletred;
}
</style>