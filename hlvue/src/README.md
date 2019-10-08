#这是一个有灵魂的项目，虽然不知道未来会怎么样，最起码，做好现在的每一天！
## 使用 饿了么的 MintUI 组件
[Github 仓储地址](https://github.com/ElemeFE/mint-ui)
[Mint-UI官方文档](http://mint-ui.github.io/#!/zh-cn)
1. 导入所有MintUI组件：
```
import MintUI from 'mint-ui'

```
2. 导入样式表：

```
import 'mint-ui/lib/style.css'

```

3. 在 vue 中使用 MintUI：

```

Vue.use(MintUI)

```

4. 使用的例子：

```

<mt-button type="primary" size="large">primary</mt-button>

```



## 使用 MUI 组件

[官网首页](http://dev.dcloud.net.cn/mui/)

[文档地址](http://dev.dcloud.net.cn/mui/ui/)
1. 导入 MUI 的样式表：
注意的是MUI不是组件库,不能通过npm下载
```
import '../lib/mui/css/mui.min.css'
```
2. 在`webpack.config.js`中添加新的loader规则：
```
{ test: /\.(png|jpg|gif|ttf)$/, use: 'url-loader' }
```
3. 根据官方提供的文档和example，尝试使用相关的组件
## 将项目源码托管到oschina中
1. 点击头像 -> 修改资料 -> SSH公钥 [如何生成SSH公钥](http://git.mydoc.io/?t=154712)

2. 创建自己的空仓储，使用 `git config --global user.name "用户名"` 和 `git config --global user.email ***@**.com` 来全局配置提交时用户的名称和邮箱

3. 使用 `git init` 在本地初始化项目

4. 使用 `touch README.md` 和 `touch .gitignore` 来创建项目的说明文件和忽略文件；

5. 使用 `git add .` 将所有文件托管到 git 中

6. 使用 `git commit -m "init project"` 将项目进行本地提交

7. 使用 `git remote add origin 仓储地址`将本地项目和远程仓储连接，并使用origin最为远程仓储的别名

8. 使用 `git push -u origin master` 将本地代码push到仓储中

## App.vue 组件的基本设置

1. 头部的固定导航栏使用 `Mint-UI` 的 `Header` 组件；

2. 底部的页签使用 `mui` 的 `tabbar`;

3. 购物车的图标，使用 `icons-extra` 中的 `mui-icon-extra mui-icon-extra-cart`，同时，应该把其依赖的字体图标文件 `mui-icons-extra.ttf`，复制到 `fonts` 目录下！

4. 将底部的页签，改造成 `router-link` 来实现单页面的切换；

5. TabBar 路由激活时候设置高亮的两种方式：

 + 全局设置样式如下：

 ```
 	.router-link-active{
      	color:#007aff !important;
    }
 ```
 + 或者在 `new VueRouter` 的时候，通过 `linkActiveClass` 来指定高亮的类：

 ```
创建路由对象
    var router = new VueRouter({
      routes: [
        { path: '/', redirect: '/home' }
      ],
      linkActiveClass: 'mui-active'
    });

 ```
## 实现 tabbar 页签不同组件页面的切换

1. 将 tabbar 改造成 `router-link` 形式，并指定每个连接的 `to` 属性；

2. 在入口文件中导入需要展示的组件，并创建路由对象：

```
 导入需要展示的组件
    import Home from './components/home/home.vue'
    import Member from './components/member/member.vue'
    import Shopcar from './components/shopcar/shopcar.vue'
    import Search from './components/search/search.vue'

创建路由对象
    var router = new VueRouter({
      routes: [

        { path: '/', redirect: '/home' },

        { path: '/home', component: Home },

        { path: '/member', component: Member },

        { path: '/shopcar', component: Shopcar },

        { path: '/search', component: Search }
      ],
      linkActiveClass: 'mui-active'
    });

```
## 使用 mt-swipe 轮播图组件

1. 假数据：
```
lunbo: [
        'http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg',

        'http://www.itcast.cn/images/slidead/BEIJING/2017511009514700.jpg',

        'http://www.itcast.cn/images/slidead/BEIJING/2017421414422600.jpg'
      ]
```
2. 引入轮播图组件：

```
<!-- Mint-UI 轮播图组件 -->

    <div class="home-swipe">

      <mt-swipe :auto="4000">

        <mt-swipe-item v-for="(item, i) in lunbo" :key="i">

          <img :src="item" alt="">

        </mt-swipe-item>

      </mt-swipe>

    </div>

  </div>
```
## 在`.vue`组件中使用`vue-resource`获取数据
1. 运行`cnpm i vue-resource -S`安装模块
2. 导入 vue-resource 组件
```
import VueResource from 'vue-resource'

```

3. 在vue中使用 vue-resource 组件
```
Vue.use(VueResource);
```
## 使用mui的`tab-top-webview-main`完成分类滑动栏

### 兼容问题
1. 和 App.vue 中的 `router-link` 身上的类名 `mui-tab-item` 存在兼容性问题，导致tab栏失效，可以把`mui-tab-item`改名为`mui-tab-item1`，并复制相关的类样式，来解决这个问题；
```
    .mui-bar-tab .mui-tab-item1.mui-active {
      color: #007aff;
    }

    .mui-bar-tab .mui-tab-item1 {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon {
      top: 3px;
      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
      font-size: 11px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
```
2. `tab-top-webview-main`组件第一次显示到页面中的时候，无法被滑动的解决方案：
 + 先导入 mui 的JS文件:
 ```
 import mui from '../../../lib/mui/js/mui.min.js'
 ```
 + 在 组件的 `mounted` 事件钩子中，注册 mui 的滚动事件：
 ```
 	mounted() {
    	// 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
        mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
  	}
 ```
3. 滑动的时候报警告：`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`
```
解决方法，可以加上* { touch-action: none; } 这句样式去掉。
```
原因：（是chrome为了提高页面的滑动流畅度而新折腾出来的一个东西） http://www.cnblogs.com/pearl07/p/6589114.html
https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action


## 移除严格模式
[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

## [vue-preview](https://github.com/LS1231/vue-preview)
一个Vue集成PhotoSwipe图片预览插件

# test

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
##获取所有评论数据显示到页面中
1.getComments

##第三天加载评论的功能
1.为加载更多按钮，绑定一个点击事件，请求下一页数据
2.点击事件触发时让data里的pageindex++,然后调用this.getComments()方法，目的是为了重新获取最新一页数据
3.获取到评论区的数据后，为了防止老数据把新数据覆盖的情况，我们在点击获取数据的时候，每当获取到新数据的时候，调用数组contcat方法拼接成新的数组。

##完成点击增加评论功能
1.把文本框做栓向数据绑定。v-model="msg"
2.给其绑定绑定点击事件
3.效验评论区是否为空，为空则Toast提示用户内容不能为空
4.通过vue-resoure发送一个请求，把评论提交给服务器 Vue.fttp.options.emuldateJSON = true 
5.当发表评论OK，重新刷新列表，以查看最新的评论
+ 如果调用getComments方法刷新页面的时候，可能只得到最后一条的评论，前几页就获取不到
+那么我们就换一种思路：当评论成功后，手动拼接出一个最新评论的对象，然后调用数组的unshift方法，把最新的评论追加到data中的news的方法的开头，这样就能完美实现刷新评论的需求
```
Post(){
    if(this.msg.trim().length===0){
        Toast(内容不能为空')
    }
    this.$http.post("api/getcomment/"+this.$router.params.id,{
          content:msg
    })
      .then(e=>{
          if(e.body.status===0){
              let cmt = {
                  user_nam="匿名用户"，
                  item_time:Dtaa.now(),
                  item_conten:"this.msg"
              }
              this.comment.unshift(cmt)
              this.msg=""
          }else{
              Toast("获取数据错误")
          }

    })
}
```
##改变图片分享的链接
1.定义图片分享的路由
2.定义组件
3.在router.js里建立链接

##绘制图片列表 组件页面结构美化
1.制作 顶部滑动条
2.制作 底部的图片列表

##制作顶部条遇到的坑
1.需要借助MUI中的tab-top-webview-main.html
2.复制过来需要把 id为slider 中的 mui-fullscreen的类去掉不然会撑满全屏
3.无法正常触发滑动，通过检查官方文档，发现这是就是文件，需要被初始化
  +1.导入mui.min.js
  +2.调用官方提供的方式初始化
  ```
  mui('.mui-scroll-wrapper').scroll({
      deceleration:0.0005,
      0.0006
       //flick 减速系数

  })
  ```
4.我们在初始化:滑动条的时候，导入mui.js.但是控制台报错‘’
  + 经过合理的推测，觉得可能是mui.js中用到了'caller','callee',
  'arguments' 和webpack打包好的bundle.js中的默认是启动的严格模式所以这两者
  起冲突了；
  +解决的方案：1.把mui.min.js中的非严格模式代码改掉，但是不现实
              2.把wabpack打包的严格模式禁用掉
  
  +最终我们选择了 plan B 移除严格模式：使用这个插件
    babel-plugin-transform-remove-strict-mode
5.头部导航栏是可以滑动了，但是页码刷新之后又不可以刷新了，经过认真排查我们发现，初始化滑动条，必须要在在DOM元素挂载之后。所以
我们把初始化滑动条的代码，放到了钩子函数的mounted中
6.当滑动条OK后，点击首.购物车.搜索.会员都切换不了路由了，所以去App.vue里把每个
tabbar按钮的一样式类名换了一下。`mui-tab-item`改成了`mui-tab-item-lhl`

##渲染列表数据
1.制作图片列表区域，先获取数据并且想染。
2.图片渲染的时候需要用到图片懒觉在，我们可以使用现成的，min-ui里的`Lazy load`
3.根据`Lazy load`的实例文档，尝试使用。
4.渲染图片列表,实现了懒加载和图片的css样式改造

##实现点击图片，跳转到图片详情页
1.把li改成router-link，因为改了li页面的样式受到了，影响所以用tag="li"指定一下
2.创建对应的路由组件photosIfo
3.router里配置建立链接

##实现图片的缩略功能
1.使用插件 vue-preview插件(npm i vue-preview -S)
2.获取所有的图片列表，然后用v-for指令渲染
3.需要注意的是img标签中的class不能去掉，每个图片的数据对象中必须要有W和G属性

##css绘制商品列表页面

##尝试在手机上去进行项目的预览和测试
1.保证自己的手机可以正常运行；
2.要保证手机 和 开发项目的电脑处于同一个WIEI环境中，也就是手机可以访问到电脑的IP
3.打开自己的项目中的package.json文件，在dev脚本中，添加一个--host指令，把当前电脑的
WIFI IP地址设置为--host的指令
+如何查看自己电脑处的IP，在cmd终端中运行`ipconfig`,查看无线网的IP地址
 
##获取数据渲染页面
1.按照结构文档获取到所有的数据，获取的时候加上页面获取，默认第一页。
2.获取到的数据通过v-for,循环渲染页面
##点击加载等加载更多数据
1. 绑定点击事件，定义方法
2.因为点击加载更多的时候，新的只会把老的值覆盖，所以在获取商品数据的方法里要调用数组concat的方法
 把新值和老值拼接成最新的数组
  ```
  this.goodslist = this.goodslist.concat(e.body)

  ```
3.点击加载跟多的时候，让默认pageindex++,从最新的页码
调用getgoodsList方法获取加载的新数据

##实现进入商品详情页
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

##实现详情页的轮播图
1.经过分析后发现商品详情页的也有轮播图，所以我们把轮播图拆分成公共的组件
2.有需要的组件，通过父传子的方法传递加载轮播图数据
3.在详情页组件获取数据后发项后给的图片是src，而且轮播图里公用的是img，所以在获取详情页数据的时候不要着急赋值，若是forEach循环一下数组，让item.img = item.src

##解决轮播图宽度的问题
1.因为在好几个组件里都用到了轮播图，所以我把轮播图单独拆成了一个独立的公共组件，哪个组件需要就哪个组件引入，然后在把需要轮播的数据通过父传子的方式，把数据传递给子组件即可。
2.在父组件里使用轮播图的过程中，因为每个组件里需要的图片宽度不同，有些是宽100%,有些宽度自适应，就会导致伦图样式丑陋。
3.解决的办法
+解决的办法是用vue提供的ifull属性，接受的值为true和false
+如果需要自适应为fasle,需要widt100%为true
+在swiper里定义一个.full类名width:100%
+同时在swiper组件用动态行间属性： :class="{'full':isfull}"

##实现图文介绍和商品评论区
1.用编程式导航的方法
2.分别绑定两个事件，在事件里用this.$router.push('/home/doodsdecs')/this.$router.push('/home/doodsdecs')
3.创建对应的两个组件
4.在路由配置表里配置对应的路由 
 
 ##实现图文介绍
1.根据id获取对应的图文介绍的数据,获取的图文介绍数据中的图片和内容适合是
  html格式的，所以在div里渲染的时候需要用v-html格式渲染

##实现商品评论页面
1.导入商品评论组件<cmtbox :id="this.$route.id"></cmtbox>用this.$route.id渲染对应的数据

##实现商品加入购物车的小球动画实现
1.点击加入购物车实现3D的方式实现小球动画的移动。
2.小球先固定定位position后
3.用v-show控制小球的显示和隐藏（Boolen），在data挂载一个ballfalg= falae
4.定义一个方法thisfalg(){
  ballfalg = !ballfalg 
}
5.想要实现小球位位移用<transtion></transtion>包一下，因为要实现的是半长动画，要用钩子函数
6.
```
<transtion
@before-enter="beforeEnter"
@before="enter"
@before="afertEnter"
><div class="ball" v-show="ballfalg"></div></transtion>
```
7.在metodes里定义3D钩子函数方法
  beforeEnter(el){
//小球刚进来的位置
el.style.transform = 'translate(0,0)'
  }
  enter(el,done){
el.offsetWidth;
el.style.transform:translate(0,0)
el.style.transtion = 'all ls ease'
//ease动画效果可以去cubic-bezier.com/#.4,-0.3,1,.68去复制对应的3D动画
done()
  }
  afterEnter(el){
this.ballFlag = !this.ballFlag;
  }

##实现小球动画优化的思路
1.先分析导致动画不准确的本质原因：是因为我们把小球最终位移到的位置，已经局限在了
  某一分辩率下的，滚动条未滚动的情况下：
2.只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后问题就出现
3.因此我们经过分析得到结论：不能把位置的坐标直接写死了，而是应该根据不同的
  情况，动态计算这个坐标值；
4.经过分析得出解题思路：先得到微标的横纵坐标，在得到小球的横纵坐标，然后让y
  值求差，x值也求差得到的结果，就是横坐标要位移的距离 
5.如何获取微标和小球的位置？？？
  domobject.getBoundingClientRect()//获取元素的顶端和left的绝对位置
6.用ref设置用$refs.ball获取小球元素
8.获取元素的绝对位置和微标的位置

##实购物车增加数量
1.分析发现购物按钮是goodsinfo组件的，而数字是是属于goodsinfo_numbox.vue的
2.由于涉及到父子组件的嵌套，所以无法直接在父组件中获取到选中的商品数量值
3.涉及到子组件通父组件传值（想到事件调用的机制）
4.事件调用的本质，父像子传递方法，子掉用这个方法同时把数据传给父组件
6.子组件的input上定义一个change事件，把数据传给父组件
chnegeCount(){
  this.#emit('getCount',parseInet(this.$refs.numbox.value))
}

7.把库存的数量用自定义属性的方式传给子组件：max=":max="goodsinfo_stock-quantity""
8.props：['max']
9.传过去后发现页面数据改变了，但是在子组件的打印值为undefined，因为不知道传了多少数据
10.所以应watch的方法监听watch:{
 max:function(newVal.newVal){
  mui(".mui-numbox").numbox.setOption("max", newVal);
  }
}
只要max发生改变，就触发mui
 
##项目中为什么要使用Vuex
1.VueX是专门为vue.js管理数据的工具，它可以把一些共享数据保存到
Vuex中，方便整个程序中的任何组件直接获取或者修改
2.在数据使用的过程中，如果只单纯的父传子的话就用自定义属性的方式，用props接受
3.如果时子传父的话用自定义事件的方式，在父组件身上写上方法，自定义事件传给子组件，子组件用自己的方法用$emit接受把子组件的数据传给父组件
4.如果是多层的数据嵌套，较为复杂数据不好管理，这个时候就要用到Vuex
5.同级之间没有嵌套的关系兄弟之间传递数据的话比较麻烦可以定义一个VM实例在VM实例上绑定一个方法on事件或者$emit,去取。
6.Vuex是为了保存组件之间的共享数据而诞生的
7.import Vuex from 'Vuex'
8.Vue.use(Vuex)
9.var store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    add(state,obj){
      count += (obj.a + obj.c)
    }//如果子组件想使用,mutations中的方法只能使用
  },//this.$state.commit('方法名')
  ations:{

  },
  getters:{
//注意Vuex里的getters只对外提供数据，不对外修改数据，如果要修改数据去找mutations
optCount:function(state){ 
  return '当前的数据'+ state.count
}
  }
})
10.如果组件中的方法只接收了个参数，第三个参数为undefined，如果想要传多个参数的话用对象的方式
state的数据只能通过this.$state.***来访问
只要挂载到了VM身上全局都能通过this.$state***获取

##实现购车页面的点击数量++
1.点击加入购物车,把商品信息保存到stoer中的car上,
分析:1.查看如果购物车中，之前就已经有这个对应的商品了那么只需要跟新数据就行了
     2.如果没有，则直接把商品数据，push到car中即可
   
  
##实现点击头部返回返或到首页
1.到mint-ui中复制一个返或样式，data实例上挂载一个falg的属性
2.绑定点击返回事件，返回用路由判断 this.$route.go(-1)
3.因为默人只到/home,所以用watch监听路由转
```
 watch(){
   "route.path":function(newVal){
     if(route==='/home'){
       flag = false
     }else{
       flag = true
     }
   }
 }
```
4.监听好路由后，发现只要刷新后反汇编理由没了，所以要在creatd里在判断一下
```
this.flag = this.$route==='/home' ? false :true
```
 ##假设项目完成之后该做的一些工作
1.npm run build 执行打包上线
  设置为false之后打包的速度就会快一点
  productionSourceMap: false,
2.因为做项目的时候用的插件是mint-ui用的时候是全部导入没有按需引入，所以会导致项目体积过大，所以我们用的时候可以借助mint-ui里的按需引入
3.先下载一个npm install babel-plugin-component -D
4.然后在.babelrc里配置
```
 "plugins": [
    "transform-vue-jsx",
    "transform-runtime",
    [
      "component",
      [
        {
          "libraryName": "mint-ui",
          "style": true
        }
      ]
    ]
  ]
```

1、vue的自定义指令，注册一个全局的自定义指令，
   如果是在组件里的自定义就在后面加directives
   跟filter差不多，字面量的方式创建，来上一个一个小栗子如：(v-tack)固定定位离顶部距离300px
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

2、插入元素的父节点会被调用
Vue.directive('scroll', {
  //被插入的元素插入到父节点
  inserted(el, binding, vnode) {
    console.log(vnode);
    window.addEventListener('scroll', vnode.context.scrollLoad)
  }

})














##jsonp跨域问题
安装： npm install jsonp@0.2.1
1.Jsonp发送的不是一个ajax请求，他动态创建一个script标签，script没有同源策略限制，所以能跨域 有一个返回参数 callback ， 后端解析url，返回一个方法。
以后需要多出引用jsonp跨域请求，将其创建在 scr/common/jsonp.js 中
jsonp promise化
import originJSONP from 'jsonp'
export default function jsonp(url, data, option) {
  // jsonp的三个参数
  // - url-->一个纯净的url地址
  // - data --> url中的 query 通过 data 拼到url上
  // - option
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
 // 拼接data到url
function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  return url ? url.substring(1) : ''
}
注意：当路径报错的时候，我们要想到webpack.base.conf.js配置文件中的 alias 选项 确保路径是否匹配
Recommend的数据获取
在 recommend.vue 中的 created 生命周期钩子中调用_getRecommend 方法
_getRecommend 方法调用recommend.js中暴露出来的getRecommend方法
而 getRecommend 方法调用了 Jsonp 方法， Jsonp方法抓取接口，从而获得数据
有的jsonp接口url很长，但是真正的url知识前面的部分
大公司一般用0来代表一切正常
2.jsonp github仓库