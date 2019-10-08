<template>
  <div class="tmpl">
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <textarea cols="50" rows="10" v-model="commentContent"></textarea>
        </li>
        <mt-button type="primary" size="large" @click="commentHeader">发表评论按钮</mt-button>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>44条评论</span>
          </div>
        </li>
      </ul>
      <ul class="comment-list">
        <li>匿名用户1：大家好呀！我是花花！2019-9-24</li>
      </ul>
      <mt-button type="danger" size="large" @click="loadpage(page)">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["cid"],
  data() {
    return {
      comment: [],
      page: 1,
      commentContent: ""
    };
  },
  methods: {
    commentHeader() {
      //点击发表评论post请求
      this.$axios
        .post(`postcomment/${this.cid}`, "content=" + this.commentContent)
        .then(res => {
          console.log(data.res);

          //提交完后把输入框清空
          this.commentContent = "";
          this.page = 1; //加载第一页的数据
          this.loadpage();
        })
        .catch(error => {
          console.log("获取评论失败！", error);
        });
    },
    loadpage(page) {
      //点击加载更多
      this.$axios
        .get(`gtecomment/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          //如果没有数据了，提用户没有数据了
          if (this.res.data.length === 0) {
            this.$totas("没有数据了！");
          }
          //怎么区分他是加载第一页的数据和第二页的数据
          if (page) {
            //page有值表示加载更多拼接成新的数组
            this.comments = this.comment.concat(res.data);
          } else {
            //第一次加载直接赋值就可以了
            this.comment = this.res.data;
          }
          this.page++; //加载第二页的数据
        })
        .catch(error => {
          console.log("获取评论数据分页失败！");
        });
    }
  },
  created() {
    //请求评论的数据
    let page = this.$router.query.page || "1";
    this.loadpage();
  }
};
</script>

<style  scoped>
.tmpl {
  padding-bottom: 100px;
}
.photo-comment > div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}
</style>