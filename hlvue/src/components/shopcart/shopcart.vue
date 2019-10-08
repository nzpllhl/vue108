<template>
  <div>
    <Navbar title="购物车" />
    <div class="pay-detail">
      <ul>
        <li class="p-list">
          <!-- 获取到购物车列表用v-for渲染购物车里的数据列表 -->
          <!-- <mt-switch v-model="shop.isSelected"></mt-switch> -->
          <mt-switch></mt-switch>
          <img src alt />
          <div class="pay-calc">
            <p>商品标题</p>
            <div class="calc">
              <span>￥777</span>
              <span @click="substract(shop)">-</span>
              <span>1</span>
              <span @click="addNum(shop)">+</span>
              <a href="javascript:;" @click="remove(shop,index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费)</p>
        <span>已经选商品1件，总￥888元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsTool from "@/GoodsTool";
/*
获取数据的时候获取对应的ID
*/
export default {
  data() {
    return {
      shopCar: []
    };
  },
  //路由离开之前问一下，确定要离开吗？
  beforeRouteLeave(to, from, next) {
    let res = confirm("确定离开吗？？？");
    //如果确定那就把数据存放到obj中
    if (res) {
      let obj = {};
      this.shopCart.forEach(shop => {
        obj[shop.id] = this.num;
      });
      GoodsTool.saveGoods(obj);
      next();
    } else {
      next(false); //取消导航
    }
  },
  //计算多个属性
  computed: {
    payment() {
      //默认只有get方法
      let total = 0; //总钱数
      let count = 0; //总数量
      //循环数组
      this.shopCart.forEach(shop => {
        //循环数组看一下是否是处于勾上的转态，如果是那就计算
        if (shop.isSelected) {
          count += shop.num;
          total += shop.num * shop.sell.price;
        }
      });
      return {
        total,
        count
      };
    }
  },
  methods: {
    substract(shop) {
      if (shop.num === 0) {
        return;
      }
      shop.num--;
      this.store.dispatch("addShopNumByAction", -1);
    },
    addNum(shop) {
      shop.num++;
      //使用vuex的方法把购物车列表的小球数量也同步到转态中
      this.store.dispatch("addShopNumByAction", 1);
    },
    remove(shop, index) {
      //删除数组元素
      this.shopCart.splice(index, 1);
      //删除
      delete GoodsTool[shop.id];

      //对眼的地步导航栏的数据也要删除,有多少个小球就减多少个
      GoodsTool.removeGoods(shop.id); //删除后台数据
      let num = shop.num;
      this.$store.dispatch("addShopNumByAction", -num);
    },
    created() {
      //获取对应的数据
      console.log(GoodsTool.getGoodsList());
      //获取一下所有的数据
      let goodsList = GoodsTool.getGoodsList();
      //{"89":4,"89":5,"90":7}
      //如果有数据就发起购物车列表的请求数据
      let ids = Object.keys(goodsList).json(",");
      if (ids) {
        this.$axios
          .get(`getshopcarlist/${ids}`)
          .then(data => {
            this.shopcar = data.data;
            //渲染完列表后发现购物车列表里的每一个商品购买数量
            //没有更新，所以要在这里处理一下数量，
            //获取到数据以后给数组里的元素添加一个num属性
            for (let i = 0; i < this.shopcar; i++) {
              let shop = this.shopcar[i];
              //设置num属性
              let num = getGoodsList[shop.id];
              if (num) {
                //如果有值那就让this.num = num
                // shop.num = num;
                // shop.isSelected = true; //默认都打开
                //如果后端数据不完整，前端想通过手动的方式进行添加那就
                //用$set的方式进行添加
                this.$set(shop, "num", num);
                this.$set(shop, "isSelected", true);
              }
            }
          })
          .catch(error => {
            console.log("获取购物车列表失败！", error);
          });
      }
    }
  }
};
</script>

<style  scoped>
.pay-detail ul li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 3px;
}
.pay-detail ul {
  padding-left: 5px;
  margin-top: 5px;
}
.pay-detail ul li img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
}

.pay-detail ul li > :nth-child(1) .pay-detail ul li > :nth-child(3) {
  display: inline-block;
}

.pay-calc p {
}
</style>