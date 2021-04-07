@[TOC](redux)



# Redux

## 基本理解

### 学习文档

* 1，英文文档：[https://redux.js.org/](https://redux.js.org/)
* 2，中文文档：[http://www.redux.org.cn/](http://www.redux.org.cn/)
* 3，Github：[https://github.com/reactjs/redux](https://github.com/reactjs/redux)

### redux 是什么

* 1，redux 是一个专门用于做**<font color="#f00">状态管理</font>**的JS库(不是react插件库)。
* 2，它可以用在 react，angular，vue 等项目中, 但基本与 react 配合使用。
* 3，作用：集中式管理 react 应用中多个组件**<font color="#f00">共享</font>**的状态。

### 什么情况下需要使用 redux

* 1，某个组件的状态，需要让其他组件可以随时拿到（共享）。
* 2，一个组件需要改变另一个组件的状态（通信）。
* 3，总体原则：能不用就不用，如果不用比较吃力才考虑使用。

### redux 工作流程

​						![image-20210401145503505](E:\React\02-create-react-app\assets\redux工作流程.png)      

## 三个核心概念

### action

* 1，动作的对象

* 2，包含2个属性

  * `type`：标识属性，值为字符串，唯一，必要属性
  * `data`：数据属性，值类型任意，可选属性

* 3，例子：

  ```json
  { type: 'ADD_STUDENT', data: { name: 'tom', age: 18 } }
  ```

### reducer

* 1，用于初始化状态、加工状态。
* 2，加工时，根据旧的 state 和 action， 产生新的 state 的**纯函数**。

### store

* 1，将 state、action、reducer 联系在一起的对象
* 2，如何得到此对象?
  * 1)   `import {createStore} from 'redux'`
  * 2)  `import reducer from './reducers'`
  * 3)  `const store = createStore(reducer)`
* 3，此对象的功能?
  * 1）getState()：得到 state
  * 2）dispatch(action)：分发 action，触发 reducer 调用，产生新的 state
  * 3）subscribe(listener)：注册监听，当产生了新的 state 时，自动调用

## 核心API

### createstore()

* 作用：创建包含指定 reducer 的 store 对象

### store对象

* 1，作用：redux 库最核心的管理对象
* 2，它内部维护着：
  * 1）state
  * 2）reducer
* 3，核心方法：
  * 1）getState()
  * 2）dispatch(action)
  * 3）subscribe(listener)
* 4，具体编码：
  * 1）store.getState()
  * 2）store.dispatch({type:'INCREMENT', number})
  * 3）store.subscribe(render)

### applyMiddleware()

* 作用：应用上基于 redux 的中间件(插件库)

### combineReducers()

* 作用：合并多个 reducer 函数

## 使用 redux 编写应用

**案例效果**

## redux 异步编程

### 基本理解

* 1，redux 默认是不能进行异步处理的
* 2，某些时候应用中需要在**<font color="#f00">redux中执行异步任务</font>**(ajax, 定时器)

### 使用异步中间件

```powershell
npm install --save redux-thunk
```

# react-redux

![](E:\React\resources\react全家桶资料\02_原理图\react-redux模型图.png)

## 基本理解

* 1，一个 react 插件库
* 2，专门用来简化 react 应用中使用 redux

## react-redux 将所有组件分成两大类

* 1，UI组件
  * 1）只负责 UI 的呈现，不带有任何业务逻辑
  * 2）通过 `props` 接收数据(一般数据和函数)
  * 3）不使用任何 Redux 的 API
  * 4）一般保存在 components 文件夹下
* 2，容器组件
  * 1）负责管理数据和业务逻辑，不负责UI的呈现
  * 2）使用 Redux 的 API
  * 3）一般保存在 containers 文件夹下

## 相关API

* 1，Provider：让所有组件都可以得到 state 数据

  ```jsx
  <Provider store={store}>    
      <App />
  </Provider>
  ```

* 2，connect：用于包装 UI 组件生成容器组件

  ```js
  import { connect } from 'react-redux'
  connect (mapStateToprops, mapDispatchToProps)(Counter) 
  ```

* 3，mapStateToprops：将外部的数据（即state对象）转换为UI组件的标签属性

  ```js
  const mapStateToprops = function (state) {
      return {
          value: state
      }
  }
  ```

* 4，mapDispatchToProps：将分发 action 的函数转换为UI组件的标签属性

  ```js
  const mapDispatchToProps = (dispatch) => {
      return {
          increment: (number) => {
              // 通知redux执行加法
              dispatch(createIncrementAction(number))
          }
      }
  }
  ```

# 使用上 redux 调试工具

**安装chrome浏览器插件**

**下载工具依赖包**

```powershell
npm install --save-dev redux-devtools-extension
# 或者
yarn add redux-devtools-extension
```

**store中进行配置**

```js
import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```

# 纯函数和高阶函数

## 纯函数

* 1，一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
* 2，必须遵守以下一些约束
  * 1）不得改写参数数据
  * 2）不会产生任何副作用，例如网络请求，输入和输出设备
  * 3）不能调用Date.now()或者Math.random()等不纯的方法
* 3，redux 的 reducer 函数必须是一个纯函数

## 高阶函数

* 1，基本理解：一类特别的函数
  * 1）情况1：参数是函数
  * 2）情况2：返回是函数
* 2，常见的高阶函数：
  * 1）定时器设置函数
  * 2）数组的 `forEach() / map() / filter() / reduce() / find() / bind()`
  * 3）promise
  * 4）react-redux 中的 connect 函数
* 3，作用：能实现更加动态, 更加可扩展的功能