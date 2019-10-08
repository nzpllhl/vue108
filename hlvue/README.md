
# hlvue 海丽的第一项目:
项目开始了有点激动，又有点害怕！
## 问题一
A.数据多以了后底部的导航栏会跟这滚动条走，不固定在底部
解决的办法是在公用的css里把body和hhtml设置一下如下：
```
/* 解决底部栏跟着动，不固定在底部的问题 */
html{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
body{
    padding-top:40px;
    width: 100%;
    height: 100%;
    overflow: auto
}

```
## 问题二：
1.在制作九宫格的过程中，用图片路劲的方式导入图片，路劲没有错，但是图片没有导入进来，虽然设置了宽高，但是不起作用。
## 解决的办法
A: 虽然没说assets和statis都是装静态文件的,但是区别是assets的文件是需要打包的而static是不需要打包的直接就放在文件下了
B:assets文件在vue中的template/style下用可以直接相对路劲的方式，但是在script必须用模块导入的方式：import，static文件在vue
  任何地方度可以用相对路劲的方式
## 问题三
页面底部的间距不对

# 需要注意的知识点
vue-router里的linkActiveClass默认激活class类名，接受string类型，只对router-link->静态A标签起作用

# 小秘诀一般人我不告诉她
1.需要的公共组件建好后，可以注册到main里,需要的组件直接用就可以






