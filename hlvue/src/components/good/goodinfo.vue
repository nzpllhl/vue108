<template>
  <div class="goodsInfo">
    <Navbar title="图文详情" />
    <!--小球实现 
    因为实现的是半长动画，所以不能用类，只能用过渡动画的钩子函数。
    -->
    <transition name="ball" @after-enter="afterEnter">
      <div class="ball" ref="ball" v-if="isfalse"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!--轮播图 -->
          <Mysewipt :lunbotuList="lunbotu" :isfull="false"></Mysewipt>
        </div>
      </div>
    </div>
    <!-- 商品购买区 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsInfo.market_price}}</del>&nbsp; 销售价:
            <span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>
            <!-- 导入进来的组件 -->
            购买数量：
            <span @click="substract">-</span>
            <span>{{prickNum}}</span>
            <span @click="addnum">+</span>
            <numbox @getCount="getSelectedCount" :max="goodsinfo_stock-quantity"></numbox>
          </p>
          <mt-button type="primary" size="small">立刻购买</mt-button>
          <mt-button type="danger" size="small" @click="ballheader">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <!-- 商品参数区 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsInfo.goods_no}}</p>
          <p>库存情况:{{goodsInfo.stock_quantity}}本</p>
          <p>上架时间:{{goodsInfo.add_time|converTime('YYYY-MM-DD')}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="gooDesc(goodsInfo.id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="gocmment(goodsInfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsTool from "@/GoodsTool";
console.log(GoodsTool, "有的");
export default {
  data() {
    return {
      lunbotu: [], //轮播图的数据
      id: this.$route.params.id, //将路由中的id找到，挂载到实例上方便后期调用
      prickNum: 1, //购物车的数量
      isfalse: false //控制小球的显示和隐藏
    };
  },
  created() {
    this.getlunbutu();
    this.getGoodsInfo();
  },
  methods: {
    afterEnter() {
      this.isfalse = false; //点击加入购物车小球隐藏
      //触发EnevtBus事件绑定的，把goodinfo这边是的购物车数据传给App
      // this.$bus.$emit("sendPickNum", this.prickNum);
      //将添加的购物车数据保存到本地
      //用Vuex
      this.$store.dispatch("addShopNumByAction", this.pickNum);
      GoodsTool.add({
        id: this.getinfo.id,
        //num: this.prickNum
        num: this.$store.getters.getShopNum
      });
    },

    ballheader() {
      ////小球加入购物车的时候点击先让小球显示执行true
      this.isfalse = true;
    },

    //如果购买数量比仓库里的多那就可以在买++
    addnum() {
      if (this.prickNum < this.goodsInfo.stock_quantity) {
        this.prickNum++;
      }
    },
    //购买数量--
    substract() {
      if (this.prickNum === 1) {
        return;
      } else {
        this.prickNum--;
      }
    },

    //获取轮播图数据
    getlunbutu() {
      this.$axios
        .get("bannerList")
        .then(data => {
          this.lunbotu = data.data;
          console.log(this.lunbotu, 888);
        })
        .catch(error => {
          console.log("获取小轮播图数据失败！", error);
        });
    },
    getGoodsInfo() {
      //获取商品信息
      this.$axios
        .get("goosInfo")
        .then(e => {
          console.log(e.data, 999);
          this.goodsInfo = e.data[0];
        })
        .catch(error => {
          console.log("获取说明失败！", error, 9999);
        });
    },
    //商品详情路由的跳转
    gooDesc(id) {
      this.$router.push({ name: "goodesc", params: { id } });
    },
    // //商品评论路由的跳转
    gocmment(id) {
      this.$router.push({ name: "goodcomment", params: { id } });
    },
    add() {
      //点击加入购物车
      this.ballfalg = !this.ballfalg;
      //拼接出一个要保存到store中的数据
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsInfo.sell_price,
        selected: true //默认显示想买的商品
      };
      //因为要改变mutations,把方法传过去
      this.$store.commit("addToCar", goodsinfo);
    },

    //事件调用的方法在，父组件上定义方法传给子组件
    getSelectedCount(count) {
      this.selectedCount = count;
    }
  }
};
</script>
<style lang="less" scoped>
.goodsInfo {
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    position: absolute;
    //不定位会把轮播图顶下来
    z-index: 99;
    top: 412px;
    left: 78px;
  }
}
</style>