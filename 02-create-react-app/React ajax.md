@[TOC](React ajax)

# React ajax

## 基本理解

### 基本信息

* 1，React 本身只关注于界面，并不包含发送 ajax 请求的代码
* 2，前端应用需要通过 ajax 请求与后台进行交互（json数据）
* 3，React 应用中需要集成第三方 ajax 库（或自己封装）

### 常用的 ajax 请求库

* 1，jQuery：比较重，如果需要另外引入不建议使用
* 2，axios：轻量级，建议使用
  * 1）封装 XmlHttpRequest 对象的ajax
  * 2）promise 风格
  * 3）可以用在浏览器端和 node 服务器端

##  axios

### 参考文档

* https://github.com/axios/axios

### 相关 API

#### GET请求

* 请求示例，如下所示：

  ```js
  axios.get('/user?ID=12345')
  .then(function (response) {
      console.log(response.data);
  })
  .catch(function (error) {
      console.log(error);
  });
  
  axios.get('/user', {
      params: {
          ID: 12345
      }
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
  ```

 #### POST请求

* 请求示例，如下所示：

  ```js
  axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
  ```

## GitHub 案例

### 案例介绍

**示例效果图：**

​						![](F:\ReactJs\02-create-react-app\assets\GitHub_users.gif)     

**请求地址：**

* [https://api.github.com/search/users?q=xxxxxx](https://api.github.com/search/users?q=xxxxxx)

### 消息订阅-发布机制

* 1，工具库：**`PubSubJS`**

* 2，下载：

  ```powershell
  npm install pubsub-js --save
  ```

* 3，基本使用：

  ```js
  import PubSub from 'pubsub-js' // 引入
  
  PubSub.subscribe('delete', function(data){ }); // 订阅
  
  PubSub.publish('delete', data) // 发布消息
  ```

### 扩展：Fetch

### 参考文档

* 1，[https://github.github.io/fetch/](https://github.github.io/fetch/)
* 2：[https://segmentfault.com/a/1190000003810652](https://segmentfault.com/a/1190000003810652)

### 特点

* 1，**`fetch`**：原生函数，不再使用 XmlHttpRequest 对象提交 ajax 请求
* 2，老版本浏览器可能不支持

### 相关API

#### GET请求

* 请求示例，如下所示：

  ```js
  fetch(url).then(function(response) {
      return response.json()
  }).then(function(data) {
      console.log(data)
  }).catch(function(e) {
      console.log(e)
  });
  ```

 #### POST请求

* 请求示例，如下所示：

  ```js
  fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
  }).then(function(data) {
  	console.log(data)
  }).catch(function(e) {
  	console.log(e)
  })
  ```

### GitHub 案例总结

* 1，设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。

* 2，ES6 小知识点：解构赋值 + 重命名

  ```jsx
  let obj = { a: { b: 1 } }
  const { a } = obj; // 传统解构赋值
  const { a: { b } } = obj; // 连续解构赋值
  const { a: { b: value } } = obj; // 连续解构赋值+重命名
  ```

* 3，消息订阅与发布机制

  * 1）先订阅，再发布（理解：有一种隔空对话的感觉）
  * 2）适用于任意组件间通信
  * 3）要在组件的 `componentWillUnmount` 中取消订阅

* 4，`fetch` 发送请求（**关注分离**的设计思想）

  ```jsx
  try {
      const response= await fetch(`/api1/search/users2?q=${keyWord}`)
      const data = await response.json()
      console.log(data);
  } catch (error) {
      console.log('请求出错',error);
  }
  ```





​    