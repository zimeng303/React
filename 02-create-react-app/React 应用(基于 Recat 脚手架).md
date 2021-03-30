@[TOC](React 应用(基于 Recat 脚手架))

# React 应用（基于 React 脚手架）

## 使用 `create-react-app` 创建 react 应用

### react 脚手架

* 1，xxx 脚手架：用来帮助程序员快速创建一个基于xxx库的模板项目
  * 1）包含了所有需要的配置（语法检查、jsx编译、devServer…）
  * 2）下载好了所有相关的依赖
  * 3）可以直接运行一个简单效果
* 2，react 提供了一个用于创建 react 项目的脚手架库：`create-react-app`
* 3，项目的整体技术架构为：`react + webpack + es6 + eslint`
* 4，使用脚手架开发的项目的特点：**模块化**，**组件化**，**工程化**

### 创建项目并启动

* **第一步**，全局安装：

  ```powershell
  npm i -g create-react-app
  ```

* **第二步**，切换到想创项目的目录，使用命令：

  ```powershell
  create-react-app hello-react
  ```

* **第三步**，进入项目文件夹：

  ```powershell
  cd hello-react
  ```

* **第四步**，启动项目：

  ```powershell
  npm start
  # yarn start
  ```

### react 脚手架项目结构

```markdown
public ---- 静态资源文件夹：页面，公共图片，字体等
​           favicon.icon ------ 网站页签图标
​           index.html -------- 主页面
​           logo192.png ------- logo图
​           logo512.png ------- logo图
​           manifest.json ----- 应用加壳的配置文件
​           robots.txt -------- 爬虫协议文件

src ---- 源码文件夹
​           App.css -------- App组件的样式
​           App.js --------- App 组件
​           App.test.js ---- 用于给App做测试
​           index.css ------ 样式
​           index.js ------- 入口文件
​           logo.svg ------- logo图
​           reportWebVitals.js ------- 页面性能分析文件(需要 web-vitals 库的支持)
​           setupTests.js ------- 组件单元测试的文件(需要 jest-dom 库的支持)
```

### HelloReact 案例实现

* `src/index.js`：

  ```js
  // 引入 react 核心库
  import React from 'react'
  // 引入 ReactDOM，进行渲染
  import ReactDOM from 'react-dom'
  // 引入 App 组件
  import App from './App'
  
  // 渲染 App 到页面
  ReactDOM.render(
      <React.StrictMode>
      <App />
      </React.StrictMode>,
      document.getElementById('root')
  )
  ```

* `src/App.jsx`：

  ```jsx
  // 创建 "外壳" 组件App
  import React, { Component } from 'react'
  import Hello from './components/Hello'
  
  // 创建并暴露 App 组件
  export default class App extends Component {
      render () {
          return (
              <div>
                  <Hello />
              </div>
          )
      }
  }
  ```

* `src/components/Hello/index.jsx`

  ```jsx
  import React, { Component } from 'react'
  import './index.css'
  
  export default class Hello extends Component {
    render () {
      return <h2 className="title">Hello React</h2>
    }
  }
  ```

* ``src/components/Hello/index.css`

**样式模块化**

* 将 `src/components/Hello/index.css` 修改为 ``src/components/Hello/index.module.css`

* 在 `src/components/Hello/index.jsx` 中，引入时的语法：

  ```jsx
  import React, { Component } from 'react'
  import hello from './index.module.css'
  
  export default class Hello extends Component {
      render () {
          return <h2 className={hello.title}>Hello React</h2>
      }
  }
  ```

* <font color="#f00">注意：</font>css 文件名 后面的 `module` 不可以省略，固定写法

### Visual Studio Code 安装 React 插件

* `ES7 React/Redux/GraphQL/React-Native snippets` 插件

### 功能界面的组件化编码流程（通用）

* 1，拆分组件：拆分界面，抽取组件
* 2，实现静态组件：使用组件实现静态页面效果
* 3，实现动态组件
  * 1）动态显示初始化数据
    * a. 数据类型
    * b. 数据名称
    * c. 保存在哪个组件?
  * 2）交互(从绑定事件监听开始)

## 组件的组合使用-TodoList 

功能：组件化实现此功能

* 1，显示所有 **todo** 列表

* 2，输入文本，**点击按钮显示到列表的首位**，并清除输入的文本

  ![](F:\ReactJs\02-create-react-app\assets\todolist.gif)  

## react 脚手架配置代理总结

### 方法一

* 在 `package.json` 中追加如下配置：

  ```json
  {
      "proxy":"http://localhost:5000"
  }
  ```

* **说明**：
  * 1，优点：配置简单，前端请求资源时可以不加任何前缀。
  * 2，缺点：不能配置多个代理。
  * 3，工作方式：上述方式配置代理，当请求了 3000 不存在的资源时，那么该请求会转发给 5000 （优先匹配前端资源）

### 方法二

* 1，创建代理配置文件

  * 在 src 下创建配置文件：`src/setupProxy.js`

* 2，编写 `setupProxy.js` 配置具体代理规则：

  ```js
  const proxy = require('http-proxy-middleware')
  
  module.exports = function(app) {
      app.use(
          proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
              target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
              changeOrigin: true, //控制服务器接收到的请求头中host字段的值
              /*
           	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
           	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
           	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
           */
              pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
          }),
          proxy('/api2', { 
              target: 'http://localhost:5001',
              changeOrigin: true,
              pathRewrite: {'^/api2': ''}
          })
      )
  }
  ```

* **说明**：
  * 1，优点：可以配置多个代理，可以灵活的控制请求是否走代理。
  * 2，缺点：配置繁琐，前端请求资源时必须加前缀。