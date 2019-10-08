<template>
  <div>
    <Navbar title="新闻列表" />
    <ul class="newsList">
      <li v-for="item in newslist" :key="item.id">
        <!-- <router-link :to="{name:'newsinfo,query:{id:item.id}'}"> -->
        <router-link to="newsinfo">
          <div class="imgs">
            <img :src="item.img_url" alt />
          </div>
          <h1 class="title">{{item.title}}</h1>
          <p class="times">
            <span class="praise">点赞：{{item.click}}</span>
            <span class="time">发表时间：{{item.add_tiem|converTime('YYYY-MM-DD')}}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.$axios
      .get("newsList")
      .then(data => {
        this.newslist = data.data;
        alert(1);
        console.log(this.newslist);
      })
      .catch(error => {
        console.log("获取新闻列表数据失败！", error);
      });
  }
};
</script>

<style lang="less" scoped>
.newsList {
  margin-top: 5px;

  li {
    h1 {
      font-size: 14px;
    }
    .imgs {
      img {
        width: 100px;
        height: 100px;
      }
    }
    .times {
      font-size: 14px;
      color: #266aff;
      // felx布局直接在需要的元素身上加
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>