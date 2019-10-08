<template>
  <div id="app">
    <!-- 顶部header通过父传子的方式 -->
    <my-title></my-title>
    <!-- 路由组件的出口 -->
    <transition name="fade" mode=" out-in">
      <router-view></router-view>
    </transition>
    <!-- 底部导航栏的制作 -->
    <div class="tabBar">
      <ul>
        <li v-for="(tab,index) in tabs" :key="tab.id">
          <!-- 小小坑：linkActiveClass的高亮如果路由多了默认的转态就保存不了，所以做了操作
          A:用原生的router观察事件，绑定一个事件，用事件修饰符：@click.native = 'changeHash(index)'
          <router-link :to="tab.routerName" exact :class="{"link-active":index==currentIndex}">-->
          <router-link
            :to="tab.routerName"
            exact
            :class="{'link-active':index==currentIndex}"
            @click.native="changeHash(index)"
          >
            <img :src="tab.imgsrc" alt />
            <!-- 加入购物车的小球在CSS样式上调整 -->
            <mt-badge size="small" color="red" v-if="index===2">{{prckNum}}</mt-badge>
            <p>{{tab.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 底部栏-->
    <!-- <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
        <img slot="icon" src="./assets/img/home.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="vip">
        <img slot="icon" src="./assets/img/vip.png" />
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="./assets/img/gwc.png" />
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/img/search.png" />
        搜索
      </mt-tab-item>
    </mt-tabbar>-->
  </div>
</template>

<script>
import title from "./common/title.vue"; //引入公共组件头部

//引入路由
import home from "./assets/img/home.png";
import vip from "./assets/img/vip.png";
import shopcart from "./assets/img/gwc.png";
import search from "./assets/img/search.png";
//用数组的方式保存所有的数据，然后循环渲染
let tabs = [
  {
    id: 1,
    title: "首页",
    imgsrc: home,
    routerName: { name: "home" }
  },
  {
    id: 2,
    title: "会员",
    imgsrc: vip,
    routerName: { name: "vip" }
  },
  {
    id: 3,
    title: "购物车",
    imgsrc: shopcart,
    routerName: { name: "shopcart" }
  },
  {
    id: 4,
    title: "搜索",
    imgsrc: search,
    routerName: { name: "search" }
  }
];
export default {
  data() {
    return {
      selected: "",
      tabs: tabs,
      currentIndex: 0 //控制类名的索引
      //prckNum: 0 //底部购物的数量
    };
  },
  //用Vuex获取转态中的0
  computed: {
    prckNum() {
      return this.$store.getters.getShopNum;
    }
  },
  methods: {
    //点击的时候让导航栏的高亮一直保存状态
    changeHash(index) {
      // alert(1);点击的时候其他事件的时候保持当前的index
      this.currentIndex = index;
    }
  },
  //监听selected的变化，完成路由的跳转
  watch: {
    selected: function(newV, onlV) {
      console.log(newV, onlV);
      this.$router.push({ name: this.selected });
      console.log(selected);
    }
  },
  created() {
    //在APP组件里开始创建的时候，
    //加载APP组件的时候就挂载EventBus
    //使用EventBus事件绑定
    // this.$bus.$on("sendPickNum", num => {
    //   this.prckNum += num;
    // });

    //获取小球的总个数
    this.$store.dispatch("changeShopNumAction", GoodsTool.getTotalCount());
  },
  components: {
    "my-title": title
  }
};
</script>

<style scoped>
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.tabBar {
  width: 100%;
  height: 55px;
  background: #ccc;
  position: absolute;
  background-image: linear-gradient(180, #d9d9d9, #d9d9d9 50%, transparent 50%);
  bottom: 0;
  left: 0;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #fafafa;
}
.tabBar ul {
  width: 100%;
  overflow: hidden;
  /* 显示盒子阴影 */
  box-shadow: 1px 0 16px 0px #ccc;
}
.tabBar ul li {
  float: left;
  width: 25%;
  height: 55px;
  text-align: center;
}
.tabBar ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  position: relative;
}
.tabBar ul li p {
  font-size: 14px;
}
.tabBar ul li a img {
  width: 25px;
}
.tabBar ul li a.link-active {
  background-color: paleturquoise;
}
/* 小球的样式 */
.mint-badge.is-size-small {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>
