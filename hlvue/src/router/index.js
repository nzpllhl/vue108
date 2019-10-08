import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import vip from '@/components/vip/vip'
import shopcart from '@/components/shopcart/shopcart'
import search from '@/components/search/search'
import newsList from '@/components/news/newsList'
import newsinfo from '@/components/news/newsinfo'
import photoList from '@/components/photo/photoList'
import photoinfo from '@/components/photo/photoinfo'
import goodlist from '@/components/good/goodlist'
import goodinfo from '@/components/good/goodinfo'
import goodesc from '@/components/good/goodesc'
import goodcomment from '@/components/good/goodcomment'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'link-active',
  routes: [
    {
      path: "/",
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/vip',
      name: 'vip',
      component: vip
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: shopcart
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    //新闻列表的路由
    {
      path: '/news/list',
      name: 'news.list',
      component: newsList
    },
    {
      path: '/news/newsinfo',
      name: 'newsinfo',
      component: newsinfo,
      props: {
        title: '新闻详情'
      }

    },
    //图片详的路由动态路由匹配
    {
      // path: '/photo/list/:cateid',
      path: '/photo/list',
      name: 'photo.list',
      component: photoList

    },
    {
      path: '/photo/photoinfo',
      name: 'photoinfo',
      component: photoinfo

    },
    //商品列表
    {
      path: '/goods/list/:page',
      name: 'good.list',
      component: goodlist,
    },
    // 商品详情
    {
      path: '/good/goodinfo/:id',
      name: 'goodinfo',
      component: goodinfo,
    },
    //商品介绍，路由组件传参用共同的组件传参，用相同的组件可以路由传参。
    {
      path: '/good/goodesc/:id',
      name: 'goodesc',
      component: newsinfo,
      props: {
        title: '图文详情'
      }
    },

    {
      path: '/good/goodcomment/:id',
      name: 'goodcomment',
      component: goodcomment
    },

  ],

})
