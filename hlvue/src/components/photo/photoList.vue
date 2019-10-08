<template>
  <div class="photoList">
    <Navbar title="图文列表" />
    <div class="catelist">
      <ul>
        <li @click="cateHandler(cate.id,index)" v-for="(item,index) in cateList" :key="item.id">
          <a :class="{active:index==currentIntex}">{{item.title}}</a>
          <!-- 头部导航栏的active制作 -->
        </li>
      </ul>
    </div>
    <!-- 图片展示区域 -->
    <div class="photo-list">
      <ul>
        <li v-for="item in imgLits" :key="item.img">
          <!-- <router-link to="{name:'phototinfo',query:{id:item.id}}"> -->
          <router-link to="photoinfo">
            <!-- <img src alt /> -->
            <!-- ***mint-ui的图片懒加载lazy load*** -->
            <img v-lazy="item.img" />
          </router-link>
          <p>
            <span>{{item.title}}</span>
            <span>{{item.content}}</span>
            <br />
            <span></span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [], //头部导航分类栏的数据
      imgLits: [], //图片的数据
      currentIntex: 0 //title的索引，完成选项卡
    };
  },
  methods: {
    //     //图文详情里有两个请求，
    //     //一个是头部导航栏分类请求
    //     //一个是所有图片请求
    //  loadImgsByCateid(id) {
    //       //因为一上来就要请求所有的图片
    //       //所以在methods里封装一下
    //       this.$axios
    //         .get("bannerList")
    //         .then(data => {
    //           console.log(data);
    //           this.imgList = data.data;
    //         if(this.imgList.length===0){
    //             Toast({
    //                  message: '没有图片了',
    //                   iconClass: 'icon icon-success'
    //                });
    //            },
    //         })
    //         .catch(error => {
    //           console.log("获取所有图片失败！", error);
    //         });
    //   },
    cateHandler(id, index) {
      //点击完成选项卡功能，因为vue是控制数据的
      this.currentIntex = index;
      //2222.点击的时候动态路由的方式完成路由的跳转
      this.$router.push({ name: "photo.list", params: { cateid: id } });
    }
  },
  //一.111路由进入之前,这个钩子里是没没有this的要通过vm实例的方式获取this
  //在路由进入之前就在组件里获取所有的数据
  beforeEnter: (to, from, next) => {
    next(vm => {
      //  vm.loadImgsByCateid(to.params.cateid);
    });
  },
  /*
  在路由更新之前,调用获取数据的方法
  0-24正好请求的是分类栏的id
  因为封装过了所以调用一下就行
  3333路由进行更新
*/

  beforeUpdate(to, from, next) {
    // loadImgsBycateid(to.params.cateid);
    console.log(to);
    next();
  },
  created() {
    //  loadImgBycatelist(to.params.cateid);
    //获取头部导航栏分类的数据
    this.$axios
      .get("titlelist")
      .then(data => {
        console.log(data);
        this.cateList = data.data;
        this.cateList.unshift({ id: 0, title: "全部" });
        //console.log(this.cateList);
      })
      .catch(error => {
        console.log("获取图片详情列表失败！", error);
      });

    this.$axios
      .get("bannerList") //这个请求本来是要在上面methods里获取的,因为数据是自己伪造的数据用不了
      .then(data => {
        console.log(data);
        this.imgLits = data.data;
        console.log(this.imgLits, 1111);
      })
      .catch(error => {
        console.log("获取图片详情列表失败！", error);
      });
  }
};
</script>

<style lang="less" scoped>
.catelist {
  width: 100%;
  height: 40px;
  overflow: hidden;
}
.catelist ul {
  width: 100%;
  height: 50px;
  overflow: hidden;
  overflow: scroll;
  white-space: nowrap;
}
.catelist ul li {
  display: inline-block;
  width: 25%;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  //background: #000;
}
.catelist ul li a {
  color: springgreen;
}
.catelist ul li a.active {
  color: #fc0280;
}
.photo-list ul li {
  width: 100%;
  position: relative;
}

.photo-list ul li a {
  display: block;
  width: 100%;
}
.photo-list ul li a img {
  width: 100%;
}
.photo-list ul li p {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px 0;
}
.photo-list ul li p span {
  color: #e6e6e6;
  font-size: 12px;
}

.photoList {
  padding-bottom: 100px;
}
// 图片懒加载
image[lazy="loading"] {
  width: 400px;
  height: 300px;
  margin: auto;
}
.icon-meiyoutupian {
  width: 50px;
  height: 50px;
}
</style>