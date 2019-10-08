<template>
  <div>
    <Navbar title="图文详情" />
    <div class="phototitle">
      <p>图片标题</p>
      <span>发起日期：2017-07-09</span>
      <span>0次浏览</span>
      <span>分类：民生经济</span>
      <!-- 缩略图 -->
      <!-- <div class="imgs">
        <ul>
          <li v-for="item in thumimg" :key="item.img">
            <img :src="item.img" alt />
          </li>
        </ul>
      </div>-->
      <vue-preview :slides="thumimgs"></vue-preview>
      <div clss="photodesc">
        <!-- <p v-html='imginfo.content'></p> -->
        <p>11111111111111111111111111111111111111111</p>
      </div>
      <!-- 评论组件 -->
      <Comment :cid="$route.query.id" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      imginfo: {}, //说明
      thumimgs: [] //缩略图
    };
  },
  created() {
    //两个请求，合并请求
    //获取图文详情
    //使用axios合并获取数据的好时候，普通函数的this是undefined
    //建议用箭头函数
    var getinginfo = () => {
      // return this.$axios.get("bannder/" + id);
      return this.$axios.get("bannder");
    };
    //获取img缩略图
    var getThumIngages = () => {
      //   return this.$axios.get("bannder/" + id)
      return this.$axios.get("bannder");
    };

    this.$axios.all([getinginfo(), getThumIngages()]).then(
      this.$axios.spread((acct, perms) => {
        console.log(acct);

        console.log(perms);

        // this.imginfo = acct.data[0];

        // this.thumimg = perms.data;

        this.thumimg.forEach(item => {
          (item.src = item.src), (item.w = 500);
          item.h = 400;
        });
      })
    );
  }
};
</script>

<style  scoped>
.phototitle p {
  font-size: 20px;
  font-weight: 600;
  color: #0f80ff;
  margin: 15px 0;
}
.phototitle span {
  padding: 10px 5px;
}

.photodesc {
  font-size: 18px;
  color: #333333;
}
</style>