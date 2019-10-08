<template>
  <div id="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" style="height:200px">
      <mt-swipe-item v-for="item in list" :key="item.img">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
    <!-- <my-sewipt :lunbolist="list"></my-sewipt> -->
    <!-- 九宫格制作 -->
    <div class="list">
      <ul>
        <li v-for="grid in grids" :key="grid.id">
          <router-link :to="grid.router">
            <img :src="grid.src" alt />
          </router-link>
          <p>{{grid.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//import sewipt from "../common/sewipt.vue";
/*
问题一
1.在制作宫格的过程中，渲染图片的时候
因为图片是放在assets里的而这个文件
虽然也是放静态资源的但是，
需要通过模块话的方式打包！
解决的办法：
通过import引入图片模块的方式
2.如果是放在static里就可以直接图片路径引入就可以了
*/
import src1 from "../../assets/img/menu1.png";
import src2 from "../../assets/img/menu2.png";
import src3 from "../../assets/img/menu3.png";
import src4 from "../../assets/img/menu4.png";
import src5 from "../../assets/img/menu5.png";
import src6 from "../../assets/img/menu6.png";
let grids = [
  {
    id: 1,
    src: src1,
    title: "新闻资讯",
    router: { name: "news.list" }
  },
  {
    id: 2,
    src: src2,
    title: "图文分享",
    router: { name: "photo.list", params: { cateid: 0 } } //cateid:0就是表示我是全部的意思
  },
  {
    id: 3,
    src: src3,
    title: "商品展示",
    router: { name: "good.list", params: { page: 1 } }
  },
  {
    id: 4,
    src: src4,
    title: "资讯",
    router: { name: "news.list" }
  },
  {
    id: 5,
    src: src5,
    title: "留言反馈",
    router: { name: "news.list" }
  },
  {
    id: 6,
    src: src6,
    title: "联系我们",
    router: { name: "news.list" }
  }
];

export default {
  data() {
    return {
      list: [], //;轮播图的数据
      grids: grids //图片路由
    };
  },
  created() {
    //获取轮播图的数据
    this.$axios
      .get("bannerList")
      .then(e => {
        console.log(e);
        this.list = e.data;
        console.log(this.list);
      })
      .catch(error => {
        console.log("失败", error);
      });
  },
  components: {
    // "my-sewipt ": sewipt
  }
};
</script>

<style  scoped>
#home img {
  height: 100%;
  width: 100%;
}
.list {
  width: 100%;
  margin-top: 10px;
}
.list ul {
  display: flex;
  flex-wrap: wrap;
}
.list ul li {
  width: 33%;
  height: 100px;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
}
.list ul li a {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
.list ul li a img {
  width: 50px;
}
</style>