<template>
  <div class="goods-list">
    <Navbar title="商品列表" />
    <mt-loadmore
      :bottom-method="loadBottom"
      @bottom-status-change="handleBottomChange"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul class="<mt-loadmoregoodcontent">
        <router-link
          :to="'/good/goodinfo/'+item.bookId"
          tag="li"
          class="goods-item"
          v-for="item in goodslist"
          :key="item.bookId"
          @click="getlink(item.bookId)"
        >
          <img :src="item.bookCover" alt />
          <h1 class="itemtitle">{{item.bookName}}</h1>
          <div class="info">
            <p class="price">
              <span class="now">￥{{item.sell_price}}</span>
              <span class="old">￥{{item.bookPrice}}</span>
            </p>
            <p class="sell">
              <span>热卖中</span>
              <span>剩{{item.book_quantity}}件</span>
            </p>
          </div>
        </router-link>
      </ul>
    </mt-loadmore>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodslist: [], //购物车商品的数据
      allLoaded: false //上拉加载了，改成true的话就代表不用上拉加载了
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    //获取商品数据的方法
    getGoodslist() {
      this.$axios
        .get("ListDate")
        .then(data => {
          this.goodslist = this.goodslist.concat(data.data);
          console.log(this.goodslist);
        })
        .catch(error => {
          console.log("获取图文详情列表失败！", error);
        });
    },
    getMore() {
      // alert(1);
      //默认的页码++ 。掉用获取数据方法调用最新的数据值加载，不会把老的数据覆盖
      this.pageindex++;
      this.getGoodslist();
    },
    getlink(id) {
      /*
      通过vue-router的编程式导航类完成,的时候一定要区分$route和$router的区别
      1.thi.$route是用来获取路由参数对象的配合：params和query一起使用如：
        this.$route.parmas.id  / this.$route.params{{id:6,name="lhl"}}
        this.$route.query.id  / this.$route.query{{id:6,name="lhl"}}
      2.this.$router是一个导航[用来获取导航对象的],用它可以方便使用JS代码实现路由的
        前进，后退，跳转到新的url地址如:
        this.$router.push("/home/goodsInfo/" + id);
        this.$router.push({path:"/home/goodsInfo/"+id})
        this.$router.push({ name: "goodsInfo", params: { id } });
      3.里面需要注意的是
        在使用path时，不能使用params传参。因为会被忽略掉，要传参用query
        params传参使用name
      */

      this.$router.push({ name: "goodsInfo", params: { id } });
    },
    // loadBottom() {
    //   console.log("上拉触发了！");
    //   //通知转态发生改变
    //   this.$refs.loadmore.onBottomLoaded();
    // },
    handleBottomChange(status) {
      console.log(status);
    }
  }
};
</script>



<style lang="less" scoped>
.goods-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;

  .goods-item {
    width: 45%;
    float: left;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 0px 2px 0px 3px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;

    img {
      width: 100%;
    }
    .itemtitle {
      font-size: 14px;
    }
    .info {
      background: #ddd;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
      }
      .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .sell {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>