// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//1.引入mint-ui组
import Mint from 'mint-ui';
Vue.use(Mint);
//引入css
import 'mint-ui/lib/style.css'
//引入公共的样式
import '../static/css/gloadl.css'
Vue.config.productionTip = false

//引入Vuex
import store from './store'

//引入axios
import Axios from 'axios'
Vue.prototype.$axios = Axios//配置axios挂在vue原型上
Axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d3db94b7bd40a38a9a7f8e9/add/'//配置公共的URL
//引入preview的插件图签查看器制作缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)//相当于内部在做一件
//Vue.component('vue-preview',{})所以
//我们内部可以直接</vue-preview >


//注册全局的导航栏组件
import Navbar from '@/common/navbar'
Vue.component(Navbar.name, Navbar)
//注册全局的评论组件
import Comment from '@/common/comment'
Vue.component(Comment.name, Comment)
//注册全局的轮播图
import Mysewipt from '@/common/Mysewipt'
Vue.component(Mysewipt.name, Mysewipt)





//引入moment
import Moment from 'moment'
//自定义一个全局过滤器
Vue.filter('converTime', function (data, formatStr) {
  //data是当前的时间formatStr类似于时间
  return Moment(data).format(formatStr);
})

//全局共享的拦截器！请求拦截器
Axios.interceptors.request.use(function (config) {
  //在发送请求之前做一些什么事情，加载提示框
  Mint.Indicator.open({
    text: '努力加载中。。。'
  })
  return config;
}, function (error) {
  return Promise.reject(error);
});
//响应拦截
Axios.interceptors.response.use(function (response) {
  //数据响应之前关闭提示框！
  Mint.Indicator.close()
  return response;
}, function (error) {
  return Promise.reject(error);
});


//将EventBus 引入然后在挂载到vue的原型上
import EventBus from './EvenBus.js'
Vue.prototype.$bus = EventBus

//vue的自定义指令，注册一个全局的自定义指令，
//如果是在组件里的自定义就在后面加directives
//跟filter差不多，字面量的方式创建，
//来上一个一个小栗子如：(v-tack)固定定位离顶部距离300px
Vue.directive('tack', {
  bind(el, binding, vnode) {
    //只会被执行的时候调用一次
    el.style.position = 'fixed';
    console.log(el, binding);
    el.style[binding.arg] = binding.value + 'px';
  },
  update(el, binding, vnode) {
    //数据更新的时候掉用
    console.log(binding);
    el.style[binding.arg] = binding.value + 'px'

  }
})

//插入元素的父节点会被调用
// Vue.directive('scroll', {
//   //被插入的元素插入到父节点
//   inserted(el, binding, vnode) {
//     console.log(vnode);
//     window.addEventListener('scroll', vnode.context.scrollLoad)
//   }

// })


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
