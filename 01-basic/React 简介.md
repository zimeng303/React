@[TOC](React 入门)

# React 全家桶

* React 基础
* React-Router 路由
* PubSub + 消息管理库
* Redux 集中式的状态管理
* Ant-Design UI 组件库
* ...

# React 入门

## 官网

* 英文官网:[ https://reactjs.org/](https://reactjs.org/)
* 中文官网: [https://react.docschina.org/](https://react.docschina.org/)

1.1.4. React高效的原因

1. 使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。

DOM Diffing算法, 最小化页面重绘。

## 基本介绍

### React 是什么

* 官网定义：

  > 用于动态构建用户界面的 JavaScript 库(只关注于视图)

  也就是说，React 是一个将数据渲染为 HTML 视图的开源 JavaScript 库。

* 由 `Facebook` 开发，且开源

### 为什么要学 React?

* 1，原生 JavaScript 操作 DOM 繁琐、效率低（<font color="#f00">DOM-API 操作 UI</font>）。
* 2，使用 JavaScript 直接操作 DOM，浏览器会进行大量的<font color="#f00">重绘重排</font>。
* 3，原生 JavaScript 没有 <font color="#f00">组件化</font>，代码复用率低。

### React 的特点

* 1，采用 <font color="#f00">组件化</font> 模式、<font color="#f00">声明式编码</font>，提高开发效率及组件复用率。
* 2，在 React Native 中，可以使用 React 语法进行 <font color="#f00">移动端开发</font>。（开发 Android、IOS）
* 3，使用 <font color="#f00">虚拟DOM </font> + 优秀的 [<font color="#f00">Diffing 算法</font>](https://blog.csdn.net/zimeng303/article/details/111087859)，尽量减少与真实 DOM 的交互。

### React高效的原因

* 使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。
* DOM <font color="#f00">Diffing算法</font>, 最小化页面重绘

## 准备工作

学习 React 之前，你要掌握的 JavaScript 基础知识

* 判断 this 的指向
* class(类)
* ES6 语法规范
* npm 包管理器
* 原型、原型链
* 数组常用方法
* 模块化

## 基本使用

### 相关js库

* 1，react.js：React核心库。（返回 `React` ）
* 2，react-dom.js：提供操作DOM的react扩展库。(返回 `ReactDOM` )
* 3，babel.min.js：解析JSX语法代码转为JS代码的库。

### 基础示例

****

**效果**

![image-20210118123839567](F:\ReactJs\01-basic\assets\image-20210118123839567.png)

**代码实现**

* `hello_react.html`

  ```jsx
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>hello_react</title>
      </head>
      <body>
          <!-- 准备好一个 “容器” -->
          <div id="test"></div>
  
          <!-- 引入react 核心库 -->
          <script type="text/javascript" src="../js/react.development.js"></script>
          <!-- 引入react-dom.js，用于支持react 操作 DOM，依赖react核心库 -->
          <script type="text/javascript" src="../js/react-dom.development.js"></script>
          <!-- 引入 babel，用于将 jsx 转换为 js -->
          <script type="text/javascript" src="../js/babel.min.js"></script>
  
          <script type="text/babel">/* 此处一定要写 babel，即告知浏览器使用babel将jsx转为js */
          // 1. 创建虚拟 DOM，jsx 方式
          const VDOM = <h1>Hello, React</h1> /* 此处一定不要写引号，因为不是字符串 */
          // 2. 渲染虚拟 DOM 到页面
          /**
           * @param1：虚拟DOM 
           * @param2：容器，节点 
           */
          ReactDOM.render(VDOM, document.getElementById("test")) 
          </script>
      </body>
  </html>
  ```

****

### 创建虚拟DOM的两种方式

<img src="F:\ReactJs\01-basic\assets\image-20210118204552691.png" alt="image-20210118204552691" style="zoom:33%;" />

* 1，纯JS方式(一般不用)，不需要 Babel

  ```jsx
  /**
   * @param1：标签名
   * @param2：{Object} 标签属性
   * @param3：标签内容 
  */
  const VDOM = React.createElement('h1', {id: 'title'}, React.createElement('span', {}, 'Hello React'))
  ```

* 2，JSX方式：纯 js 的语法糖

  ```jsx
  const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
      <h1 id="title">
      <span>Hello, React</span>
      </h1>
  ) 
  ```

  > Jsx 的语法最终通过 `babel` 转换为 js 语法，也就是说，以 JSX 方式创建的虚拟DOM ，将编译成 纯JS方式创建的虚拟DOM

#### 虚拟DOM与真实DOM

* 1，React提供了一些API来创建一种 “特别” 的一般js对象

  * ```js
    const VDOM = React.createElement('xx',{id:'xx'},'xx')
    ```

  * 上面创建的就是一个简单的虚拟DOM对象

* 2，虚拟DOM对象最终都会被React转换为真实的DOM

* 3，我们编码时基本只需要操作react的虚拟DOM相关数据, react会转换为真实DOM变化而更新界面

* **代码比较**

  ```jsx
  const VDOM = ( // 虚拟DOM
      <h1 id="title">
      <span>Hello, React</span>
      </h1>
  ) 
  onsole.log("虚拟DOM：", VDOM);
  const TDOM = document.getElementById("demo")　// 真实DOM
  console.log("真实DOM：", TDOM);
  debugger;
  ```

> **关于虚拟DOM**
>
> 1. 本质是 Object 类型的对象（一般对象）
> 2. 虚拟DOM 比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
> 3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上

## React JSX

### 基础案例

****

**效果**

​          ![image-20210119142833550](F:\ReactJs\01-basic\assets\image-20210119142833550.png)                     

**代码实现**

* 总结 jsx 规则

  ```jsx
  <script type="text/babel">
      const myId = 'aTgUiGu'
      const myData = 'Hello, React'
      // 1. 创建虚拟DOM
      const VDOM = (
      <div>
          <h2 className="title" id={myId.toLowerCase()}>
              <span style={{ color: 'white', fontSize: '20px' }}>{myData.toLowerCase()}</span>
          </h2>
          <h2 className="title" id={myId.toLowerCase()}>
              <span style={{ color: 'white', fontSize: '20px' }}>{myData.toLowerCase()}</span>
          </h2>
          <input type="text" />
          <Good>123</Good>
      </div>
      )
  
      // 渲染虚拟DOM到页面
      ReactDOM.render(VDOM, document.getElementById('test'))
  </script>
  ```

**总结：jsx 语法规则**

> <font color="#f00">jsx 语法规则</font>
>
> 1. 定义虚拟DOM 时，不要写引号
> 2. 标签中混入 **JS表达式** 时要用 {}
> 3. 样式的类名指定不要用 class，要用 className
> 4. 内联样式，要用 style={{key:value}} 的形式去写
> 5. 虚拟DOM必须只有一个根标签
> 6. 标签必须闭合
> 7. 标签首字母
>    * 1，若小写字母开头，则将该标签转为 html 中同名元素，若html中无该标签对应的同名元素，则报错。
>    * 2，若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错。

****

### JSX

* 1，全称: JavaScript XML

* 2，react定义的一种类似于XML的JS扩展语法: JS + XML

  * XML 早期用于存储和传输数据

    ```xml
    <student>
    	<name>Tom</name>
        <age>19</age>
    </student>
    ```

* 3，本质是**React.createElement(component, props, ...children)**方法的语法糖

* 4，作用: 用来简化创建虚拟DOM 

  * 写法：**var ele = <h1>Hello JSX!</h1>**
  * 注意1：它不是字符串, 也不是HTML/XML标签
  * 注意2：它最终产生的就是一个JS对象

* 5，标签名任意: HTML标签或其它标签

* 6，标签属性任意: HTML标签属性或其它

* 7，基本语法规则

  * 遇到 `<`开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析
  * 遇到以 `{` 开头的代码，以JS语法解析: 标签中的 js 表达式必须用 `{ }` 包含

* 8，babel.js的作用

  * 浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行
  * 只要用了JSX，都要加上type="text/babel", 声明需要babel来处理

### 渲染虚拟DOM(元素)

* 语法: **ReactDOM.render(virtualDOM, containerDOM)**
* 作用: 将虚拟DOM元素渲染到页面中的真实容器DOM中显示
* 参数说明
  * 参数一: 纯js或jsx创建的虚拟dom对象
  * 参数二: 用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)

### JSX练习

* 需求: 动态展示如下列表

![image-20210119151503136](F:\ReactJs\01-basic\assets\image-20210119151503136.png)

* 代码实现

  ```jsx
  
  // 模拟一些数据
  // 注意：写数组可以，写成对象会报错
  const data = ['Angular', 'React', 'Vue']
  // 1. 创建虚拟DOM
  const VDOM = (
      <div>
          <h1>前端js框架列表</h1>
          <ul>
              {
                  data.map((item, index) => {
                      return <li key={index}>{item}</li>
                  })
              }
          </ul>
      </div>
  )
  // 2. 渲染虚拟DOM到页面
  ReactDOM.render(VDOM, document.getElementById('test'))
  ```

**【js语句(代码)】与【js表达式】**

> <font color="#f00">一定注意区分：</font>
>
> 1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
>
>     *            下面这些都是表达式：
>        *            (1). a 
>        *            (2). a + b
>        *            (3). demo(1)
>        *            (4). arr.map() 遍历
>        *            (5). function test () {}
>
> 2. 语句(代码)：
>
> * 下面这些都是语句(代码)：
>   * (1). if () {}
>   * (2). for () {}
>   * (3). switch () { case: xxxx }

## 模块与组件

![image-20210119154819217](F:\ReactJs\01-basic\assets\image-20210119154819217.png)

### 模块

* 理解：向外提供特定功能的js程序, 一般就是一个js文件
* 为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。
* 作用：复用js, 简化js的编写, 提高js运行效率

### 组件

* 理解：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)
* 为什么要用组件： 一个界面的功能更复杂
* 作用：复用编码, 简化项目编码, 提高运行效率

## 模块化与组件化

### 模块化

当应用的js都以模块来编写的, 这个应用就是一个模块化的应用

### 组件化

当应用是以多组件的方式实现, 这个应用就是一个组件化的应用



