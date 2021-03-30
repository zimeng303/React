@[TOC](React路由)

# 基本介绍

## SPA

* 1，单页Web应用（single page web application，SPA）。
* 2，整个应用只有 **<font color="#f00">一个完整的页面</font>**。
* 3，点击页面中的链接 **<font color="#f00">不会刷新</font>** 页面，只会做页面的 **<font color="#f00">局部更新</font>**。
* 4，数据都需要通过 ajax 请求获取, 并在前端异步展现。

## 路由

**1. 什么是路由? **

* 1，一个路由就是一个映射关系（key: value）
* 2，key 为路径，value 可能是 function 或 component

**2. 路由分类**

* 1，后端路由：

  * 1）基本理解：value 是 function，用来处理客户端提交的请求。

  * 2）注册路由：

    ```jsx
    router.get(path, function(req, res))
    ```

  * 3）工作过程：当 node 接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据

* 2，前端路由：

  * 1）基本理解：浏览器端路由，value 是 component，用于展示页面内容。

  * 2）注册路由：

    ```jsx
    <Route path="/test" component={Test}>
    ```

  * 3）工作过程：当浏览器的 path 变为 `/test` 时，当前路由组件就会变为 Test 组件

## react-router-dom 

**基本介绍**

* 1，react 的一个插件库。
* 2，专门用来实现一个 SPA 应用。
* 3，基于 react 的项目基本都会用到此库。

**相关API**

* API 说明文档：[https://react-router.docschina.org/web/guides/philosophy](https://react-router.docschina.org/web/guides/philosophy)

****

**内置组件**

* 1，<BrowserRouter>

* 2，<HashRouter>

* 3，<Route>

* 4，<Redirect>

  * 1，一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 `Redirect` 指定的路由

  * 2，具体编码：

    ```html
    <Switch>
        <Route path="/about" component={About}/>
        <Route path="/home" component={Home}/>
        <Redirect to="/about"/>
    </Switch>
    ```

* 5，<Link>

* 6，<NavLink>

  * 1）NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
  * 2）标签体内容是一个特殊的标签属性
  * 3）通过 `this.props.children` 可以获取标签体内容

* 7，<Switch>

  * 1，渲染与该地址匹配的第一个子节点 `<Route>` 或者 `<Redirect>`。
  * 2，通常情况下，path 和 component 是一一对应的关系。
  * 3，Switch 可以提高路由匹配效率(单一匹配)。

**其它对象**

* 1，`history` 对象
* 2，`match` 对象
* 3，`withRouter` 函数

# 路由组件与一般组件

* 1，写法不同：
  * 一般组件：`<Demo/>`
  * 路由组件：`<Route path="/demo" component={Demo}/>`
* 2，存放位置不同：
  * 一般组件：`components` 文件夹
  * 路由组件：`pages` 文件夹
* 3，接收到的 `props` 不同：
  * 一般组件：写组件标签时传递了什么，就能收到什么
  * 路由组件：接收到三个固定的属性
    * history：
      * go: ƒ go(n)
      * goBack: ƒ goBack()
      * goForward: ƒ goForward()
      * push: ƒ push(path, state)
      * replace: ƒ replace(path, state)
    * location:
      * pathname: "/about"
      * search: ""
      * state: undefined
    * match:
      * params: {}
      * path: "/about"
      * url: "/about"

# 路由的使用

## 基本路由使用

**案例效果**

​								![](F:\ReactJs\02-create-react-app\assets\react-router demo1.gif)                      

 **准备工作**

* 1，下载 react-router-dom：

  ```powershell
  npm install --save react-router-dom
  # yarn add react-router-dom
  ```

* 2，引入 bootstrap.css：

  ```html
  <link rel="stylesheet" href="/css/bootstrap.css">
  ```

**实现步骤**

* 1，明确好界面中的导航区、展示区

* 2，导航区的 a 标签 改为 `Link` 标签

  ```html
  <!-- 编写路由链接 -->
  <Link to="/xxxxx">Demo</Link>
  ```

* 3，展示区写 `Route` 标签进行路径的匹配

  ```html
  <!-- 注册路由，Demo 对应组件 -->
  <Route path='/xxxx' component={Demo}/>
  ```

* 4，`index.js` 中 `<App />` 的最外侧包裹了一个 `<BrowserRouter>` 或 `<HashRouter>`

**解决多级路径刷新页面样式丢失的问题**

* 1，`public/index.html` 中 引入样式时不写 `./` 写 `/` （常用）
* 2，`public/index.html` 中 引入样式时不写 `./` 写 `%PUBLIC_URL%` （常用）
  * `%PUBLIC_URL%` 代表 public 文件夹的路径
* 3，使用 `HashRouter`

**路由的严格匹配与模糊匹配**

* 1，默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）

* 2，开启严格匹配：

  ```html
  <Route exact={true} path="/about" component={About}/>
  ```

* 3，严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## 嵌套路由使用

**案例效果**

![](F:\ReactJs\02-create-react-app\assets\react-router demo2.gif)

**注意事项**

* 1，注册子路由时要写上父路由的 `path` 值

  ```html
  <Route path="/home/news" component={News} />
  ```

* 2，路由的匹配是按照注册路由的顺序进行的

##  向路由组件传递参数数据

**案例效果**

![](F:\ReactJs\02-create-react-app\assets\react-router demo3.gif)

**向路由组件传递 params 参数**

* 路由链接（携带参数）：

  ```html
  <Link to='/demo/test/tom/18'}>详情</Link>
  ```

* 注册路由（声明接收）：

  ```html
  <Route path="/demo/test/:name/:age" component={Test} />
  ```

* 接收参数：

  `this.props.match.params`

**向路由组件传递 search 参数**

* 路由链接（携带参数）：

  ```html
  <Link to='/demo/test?name=tom&age=18'}>详情</Link>
  ```

* 注册路由（无需声明，正常注册即可）：

  ```html
  <Route path="/demo/test" component={Test}/>
  ```

* 接收参数：

  `this.props.location.search`

* 备注：

  > 获取到的 `search` 是 urlencoded 编码字符串，需要借助 `querystring` 模块解析

**向路由组件传递 state 参数**

* 路由链接（携带参数）：

  ```html
  <Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
  ```

* 注册路由（无需声明，正常注册即可）：

  ```html
  <Route path="/demo/test" component={Test}/>
  ```

* 接收参数：

  `this.props.location.state`

* 备注：

  > <font color="#f00">刷新也可以保留住参数</font>

## 多种路由跳转方式

**案例效果**

![](F:\ReactJs\02-create-react-app\assets\react-router demo4.gif)