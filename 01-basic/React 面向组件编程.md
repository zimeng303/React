@[TOC](React 面向组件编程)

# React 面向组件编程

## 准备工作

**使用React开发者工具调试**       

![image-20210119160429058](F:\ReactJs\01-basic\assets\image-20210119160429058.png)

**复习 `类` 相关知识**

* **定义 `class(类)`**，代码如下：

  ```js
  // 创建一个 Person 类
  class Person {
      // 构造器方法
      constructor(name, age) {
          // 构造器中的this是谁？ -- 类的实例对象
          this.name = name
          this.age = age
      }
  
      // 一般方法
      speak() {
          // speak 方法放在了哪里？ -- 类的原型对象上，供实例使用
          // 通过 Person 实例调用speak时，speak中的this就是Person实例
          console.log(`我叫${this.name}, 我年龄是${this.age}`);
      }
  }
  
  // 创建一个 person 的实例对象
  const p1 = new Person('tom', 18)
  const p2 = new Person('jerry', 19)
  
  console.log(p1);
  console.log(p2);
  p1.speak()
  p2.speak()
  
  // p1.speak.call({a: 1, b:2}) // this 指向 {a: 1, b:2}
  ```

* **`extends`实现继承**，代码如下：

  ```js
  // 创建一个 Student 类，继承于 Person 类
  class Student extends Person {
      constructor(name, age, grade) {
          // 子类必须调用父类的构造器, 必须要在最开始调用
          super(name, age)
          this.grade = grade
          this.school = '尚硅谷'
      }
      // 重写从父类继承的方法
      speak() {
          console.log(`我叫${this.name}, 我年龄是${this.age}，我读的是${this.grade}年级`);
      }
      study() {
          // study 方法放在了哪里？ -- 类的原型对象上，供实例使用
          // 通过 Student 实例调用study时，study中的this就是Student实例
          console.log('我很努力的学习');
      }
  }
  
  const s1 = new Student('小张', 15, '高一')
  console.log(s1);
  s1.speak()
  s1.study()
  ```
  
* 给**类的实例对象**添加属性

  ```js
  class Car {
      constructor (name, price) {
          this.name = name
          this.price = price
          // this.wheel = 4
      }
      // 类中可以直接写赋值语句，如下代码的含义是，给 Car 的实例对象添加一个属性，名为a，值为1
      a = 1
  	wheel = 4
  	
  	// 给类本身添加属性，静态属性
  	static demo = 100
  }
  Car.demo = 100
  const c1 = new Car('奔驰c63', 199)
  const c2 = new Car('宝马', 299)
  console.log(c1.demo);
  ```

* **总结**

>  1. 类中的构造器不是必须写的，要对实例进行一些初始化的操作，如添加指定属性时才写
>    2. 如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的
>    3. 类中所定义的方法，都是放在了类的原型对象上，供实例去使用

**高阶函数**



**函数柯里化**

## 基本使用

### 函数式组件

* 示例示例要求，如图所示：

  ![image-20210119160552777](F:\ReactJs\01-basic\assets\image-20210119160552777.png)

* 语法：定义**函数式组件**

  ```jsx
  // 1. 创建函数式组件，首字母必须大写
  function MyComponent () {
      console.log(this); // 此处的this是undefined 因为babel编译后开启严格模式
      return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
  }
  
  // 2. 渲染组件到页面
  ReactDOM.render(<MyComponent />, document.getElementById('test'))
  /**
   * 执行了 ReactDOM.render(<MyComponent />, ......) 之后，发生了什么？、
   *     1. React 解析组件标签，找到了 MyComponent 组件
   *     2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中
   */
  ```

* **注意**：

  > 1. 创建函数式组件，组件名首字母必须大写
  > 2. 函数式数组，必须有返回值
  > 3. 渲染组件时，必须写成标签的形式，并且要闭合

### 类式组件

* 示例示例要求，如图所示：

![image-20210119160600987](F:\ReactJs\01-basic\assets\image-20210119160600987.png)

* **语法：**定义**类式组件**

  ```js
  // 1. 创建类式组件
  // 类式组件 需要继承 React.Component(React 的内置组件)
  class MyComponent extends React.Component {
      render() {
          // render 是放在哪里的？-- MyComponent的原型对象上，供实例使用
          // render 中的this是谁？ -- MyComponent的实例对象 <=> MyComponen组件实例对象 
          return  <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
      }
  }
  
  // 2. 渲染组件到页面
  ReactDOM.render(<MyComponent />, document.getElementById('test'))
  /**
   * 执行了 ReactDOM.render(<MyComponent />, ......) 之后，发生了什么？、
   *     1. React 解析组件标签，找到了 MyComponent 组件
   *     2. 发现组件是使用类定义的，随后 new 出来该类的实例，并通过该实例调用到原型上的 render 方法
   *     3. 将 render 返回的虚拟DOM 转为真实DOM，随后呈现在页面中
   */
  ```
  
* **注意**

  > 1. 类式组件，必须继承 `React.Component` (React 的内置组件)
  > 2. 类式组件，内部必须重写 `render()` 函数
  > 3. 类式组件，`render()` 中必须要有返回值

**渲染类组件标签的基本流程**

* 1，React内部会创建组件实例对象
* 2，调用render()得到虚拟DOM, 并解析为真实DOM
* 3，插入到指定的页面元素内部

**注意事项**

* 1，组件名必须首字母大写
* 2，虚拟DOM元素只能有一个根元素
* 3，虚拟DOM元素必须有结束标签

## 组件实例的三大核心属性

### state

****

**示例要求**

*需求：定义一个展示天气信息的组件*

* 1，默认展示天气炎热 或 凉爽

* 2，点击文字切换天气

  ![](F:\ReactJs\01-basic\assets\Weather组件.gif)

 **基本理解**

* 1，`state` 是**组件实例对象**最重要的属性, 值是对象(可以包含多个 `key-value` 的组合)，类似于 `Vue` 中的 `data`
* 2，组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)

**案例分析**

* 在构造器 `constructor` 中，**初始化 `state`**

  ```js
  constructor(props) {
      super(props)
      // 初始化状态 state
      this.state = { isHot: true, wind: '微风' }
  }
  ```

* 在 `Weather` 组件实例对象的原型对象上，定义方法

  ```js
  changeWeather() {
      // .....
  }
  ```

* 解决 `changeWeather` 方法中 this 指向问题

  ```js
  constructor(props) {
      ......
      this.changeWeather = this.changeWeather.bind(this)
  }
  ```

* 使用 **`setState`** 改变 `isHot` 的值，并重新渲染视图

  ```js
  changeWeather() {
      // 读取原来的 isHot 值
      const isHot = this.state.isHot
      // 严重注意：状态必须通过 setState 进行更新，且更新是一种合并，不是替换
      this.setState({ isHot: !isHot })
  
      // 严重注意：状态(state) 不可直接更改，下面这行就是直接更改！！！
      // this.state.isHot = !isHot // 这是错误的方法，只改变 isHot 的值，但并未重新渲染视图
  }
  ```

**基础实现**

* 代码分析，如下所示：

  ```js
  // 1. 创建组件
  class Weather extends React.Component {
  
      // 构造器调用几次？-- 1次
      constructor(props) {
          super(props)
          // 初始化状态 state
          this.state = { isHot: true, wind: '微风' }
          // 解决类中 this 指向问题
          // bind 生成新的函数，改变 this 指向
          // 给 Weather 实例对象，添加 changeWeather 方法
          // 右边的 this.changeWeather 表示 Weather 的原型对象上的 changeWeather 方法
          this.changeWeather = this.changeWeather.bind(this)
      }
  
      // render 调用几次？-- 1 + n 次，1 是初始化的那次；n 是状态更新的次数
      render() {
          // this : Weather 组件实例对象
          // 读取状态 state
          const { isHot, wind } = this.state
          // 此处使用的是 Weather 自身的 changeWeather 方法
          return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
      }
  
      // changeWeather 调用几次？-- 点几次调几次
      changeWeather() {
          // changeWeather 放在哪里？-- Weather 的原型对象上，供实例使用                
          // 由于 changeWeather 是作为 onClick 的回调，所以不是通过实例调用的，是直接调用
          // 类中的方法默认开启了局部的严格模式，所以 changeWeather 中的 this 为 undefined
  
          // 读取原来的 isHot 值
          const isHot = this.state.isHot
          // 严重注意：状态必须通过 setState 进行更新，且更新是一种合并，不是替换
          this.setState({ isHot: !isHot })
  
          // 严重注意：状态(state) 不可直接更改，下面这行就是直接更改！！！
          // this.state.isHot = !isHot // 这是错误的方法
      }
  }
  
  // 2. 渲染组件到页面
  ReactDOM.render(<Weather />, document.getElementById('test'))
  ```

**优化实现**

* 代码分析，如下所示：

  ```js
  // 1. 创建组件
  class Weather extends React.Component {
  
      // 往 Weather 实例对象中添加属性 state
      // 初始化状态 state
      state = { 
          isHot: true, 
          wind: '微风' 
      }
  
      render() {
          const { isHot, wind } = this.state
          return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
      }
  
      // 自定义方法 -- 要用赋值语句的形式 + 箭头函数
      // 将其放在 往 Weather 实例对象自身
      changeWeather = () => {
          console.log(this); // this 指向 Weather 实例对象
          const isHot = this.state.isHot
          this.setState({ isHot: !isHot })
      }
  }
  
  // 2. 渲染组件到页面
  ReactDOM.render(<Weather />, document.getElementById('test'))
  ```

**强烈注意**

* 1，组件中render方法中的this为组件实例对象

* 2，组件自定义的方法中this为undefined，如何解决？
  
  * a. 强制绑定this: 通过函数对象的bind()
  * b. **赋值语句 + 箭头函数** （<font color="#f00">推荐</font>）
  
* 3，状态数据，不能直接修改或更新，使用 `setState` 进行更改

  ```js
  this.setState({ key1: value1, key2: value2, ... })
  ```

### props

****

**示例要求**

*需求：自定义用来显示一个人员信息的组件*

* 1，姓名必须指定，且为字符串类型；

* 2，性别为字符串类型，如果性别没有指定，默认为男

* 3，年龄为字符串类型，且为数字类型，默认值为 18	

  ![image-20210129080630354](F:\ReactJs\01-basic\assets\image-20210129080630354.png)

**基本理解**

* 1，**每个组件实例对象**都会有 `props` (properties的简写) 属性
* 2，组件标签的所有属性都保存在 `props` 中

**基本作用**

* 1，通过标签属性从组件外向组件内传递变化的数据
* 2，**注意：**<font color="#f00">组件内部不要修改 props 数据</font>

**基础实现**

* 1，内部读取某个属性值（<font color="#f00"> 单个传递标签属性</font>）

  * <kbd>**`this.props.name`**</kbd>

  ```jsx
    // 1. 创建组件
  class Person extends React.Component {
  	render () {
  		return (
  			<ul>
  				<li>姓名：{ this.props.name }</li>
  				<li>性别：{ this.props.sex }</li>
  				<li>年龄：{ this.props.age }</li>
  			</ul>
  		)
  	}
  }
  
  // 2. 渲染组件到页面
  ReactDOM.render(<Person name="tom" sex="女" age="18"/>, document.getElementById('test'))
  ```

* 2，对 `props` 中的属性值进行类型限制和必要性限制

  * 第一种方式（React v15.5 开始已弃用）：   

  ```jsx
  // propTypes 属性规则
  // PropTypes 是 React v15.5 的内置对象
  Person.propTypes = {
      name: React.PropTypes.string.isRequired, 
      age: React.PropTypes.number
  }        
  ```

  * 第二种方式（新）：使用 `prop-types` 库进行限制（需要引入 prop-types 库）

  ```jsx
  <!-- 引入 prop-types，用于对组件标签属性进行限制，返回 PropTypes 对象 -->
  <script type="text/javascript" src="../js/prop-types.js"></script>
  <script type="text/babel">
      // 对标签属性进行类型、必要性的限制
      Person.propTypes = {
          name: PropTypes.string.isRequired, // 限制name必传，且为字符串
          sex: PropTypes.string, // 限制sex为字符串
          age: PropTypes.number, // 限制 number 为数值
          speak: PropTypes.func  // 限制 speak 为函数
      }
  </script>
  ```
  * `props` 的简写方式，将其**添加到类的自身**中

  ```jsx
  class Person extends React.Component {
      // 给类自身添加属性，使用 static
      // 对标签属性进行类型、必要性的限制
      static propTypes = {
          name: PropTypes.string.isRequired, // 限制name必传，且为字符串
          sex: PropTypes.string, // 限制sex为字符串
          age: PropTypes.number, // 限制 number 为数值
          speak: PropTypes.func  // 限制 speak 为函数
      }
  
      // 指定默认标签属性值
      static defaultProps = {
          sex: '男', // sex 默认值为男
          age: 18 // age 默认值为18
      }
  }
  ```

* 3，扩展属性: 将对象的**所有属性**通过 `props` 传递（<font color="#f00">批量传递标签属性 props</font> ）

  * <kbd>**`<Person {...person} />`**</kbd>

  ```jsx
  // 1. 创建组件
  class Person extends React.Component {
      render() {
          const { name, sex, age } = this.props
          return (
              <ul>
                  <li>姓名：{name}</li>
                  <li>性别：{sex}</li>
                  <li>年龄：{age}</li>
              </ul>
          )
      }
  }
  
  // 2. 渲染组件到页面
  const p = { name: '老刘', sex: '女', age: 18 }
  // ReactDOM.render(<Person name={p.name} sex={p.sex} age={p.age} />, document.getElementById('test2'))
  
  // 利用 ... 展开运算符 进行批量属性传递
  ReactDOM.render(<Person {...p} />, document.getElementById('test2'))
  ```

* 4，默认属性值：

  ```jsx
  // 指定默认标签属性值
  Person.defaultProps = {
      sex: '男', // sex 默认值为男
      age: 18 // age 默认值为18
  }     
  ```

* 5，组件类的构造函数（能省则省）

  * 通过给 `this.state` 赋值对象来初始化内部 `state`
  * 为事件处理函数绑定实例

  ```jsx
  constructor (props) {
  	// 构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
      super(props)   
      console.log(props) // 打印所有属性   
      console.log(this.props) // 打印所有属性
  }             
  ```

* 6，函数式组件使用 `props`

  ```jsx
  function Person(props) {
      console.log(props);
      const { name, sex, age} = props
      return (
          <ul>
              <li>姓名：{ name }</li>
              <li>性别：{ sex }</li>
              <li>年龄：{ age }</li>
          </ul>
       )
  }
  Person.propTypes = {
      // ......
  }
  
  Person.defaultProps = {
      // ......
  }
  ```

### refs与事件处理

**示例要求**

*需求：自定义组件，功能说明如下:*

* 1，点击按钮，提示第一个输入框中的值

* 2，当第**2**个输入框失去焦点时，提示这个输入框中的值

  ![](F:\ReactJs\01-basic\assets\props_event.gif)          

**基本理解**

* 组件内的标签可以定义 `ref` 属性来标识自己

**基本实现**

* 1，字符串形式的 `ref` （<font color="#f00">不建议使用</font>）

  * <kbd>**`<input ref="input1" />`**</kbd>

  ```jsx
  class Demo extends React.Component {
      // 展示左侧输入框的数据
      showData = () => {
          const { input1 } = this.refs
          alert(input1.value)
      }
      // 展示右侧输入框的数据
      showData2 = () => {
          const { input2 } = this.refs
          alert(input2.value)
      }
      render() {
          return (
              <div>
                  <input ref="input1" type="text" placeholder="点击按钮提示数据" /> 
                  <button onClick={this.showData}>点我提示左侧的数据</button>
                  <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
              </div>
          )
      }
  }
  ```

  > 注意：
  >
  > ​	使用过多，会产生效率问题。

* 2，回调形式的 `ref`

  * 内联形式的回调：<kbd>**`<input ref={ c => { this.input1 = c } }/>    `**</kbd>

    > **关于回调 refs 的说明**
    >
    > 如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

  ```jsx
  class Demo extends React.Component {
      state = { isHot: true }
      showInfo = () => {
          const { input1 } = this
          alert(input1.value);
      }
      changeWeather = () => {
          // 读取原来的状态
          const { isHot } = this.state
          // 更新状态
          this.setState({ isHot: !isHot })
      }
  
      // 将 ref 的回调函数定义成 class 的绑定函数的方式
      saveInput = (c) => { 
          this.input2 = c 
      }
      render () {
          const { isHot } = this.state
          return (
              <div>
                  <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
                  <input ref={c => this.input1 = c} type="text" /><br />
                  {/* 将 ref 的回调函数定义成 class 的绑定函数的方式 */}
                  <input ref={this.saveInput} type="text" /><br />
                  <button onClick={this.showInfo}>点击按钮输入的数据</button>
                  <button onClick={this.changeWeather}>点我切换天气</button>
              </div>
          )
      }
  }
  ```
  
* 3，`createRef()` 创建 `ref` 容器·（<font color="#f00">最推荐使用</font>）

  * `React.createRef()` 调用后可以返回一个容器，该容器可以存储被 `ref` 所标识的节点
  * 该容器是 “专人专用” 的，即每一个容器内只能存放一个节点
  * 在这个容器中，存在一个 `current` 属性，指的是当前绑定的节点

  ```jsx
  class Demo extends React.Component {
    	// 将这个容器绑定到 组件实例中  
      myRef = React.createRef()
      myRef2 = React.createRef()
      // 展示左侧输入框的数据
      showData = () => {
          // this.myRef.current 指的是 input 节点
          alert(this.myRef.current.value);
      }
      // 展示右侧输入框的数据
      showData2 = () => {
          alert(this.myRef2.current.value)
      }
      render() {
          return (
              <div>
                  <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" /> 
                  <button onClick={this.showData}>点我提示左侧的数据</button> &nbsp;
                  <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据" />
              </div>
          )
  	}
  }
  ```

**事件处理**

* 1，通过 `onXxx` 属性指定**事件处理函数**(注意 <font color="#f00">大小写</font>)

  * a. React 使用的是自定义(合成)事件, 而不是使用的原生DOM事件  --- 为了更好的兼容性
  * b. React 中的事件是通过**事件委托**方式处理的(委托给组件最外层的元素) --- 为了高效

* 2，通过 `event.target` 得到发生事件的 DOM 元素对象 --- 不要过度的使用 Refs

  ```jsx
  class Demo extends React.Component {
      showData2 = (event) => {
          alert(event.target.value)
      }
      render() {
          return (
              <div>
                  <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
              </div>
          )
      }
  }
  ```

> <font color="#f00">注意：</font>
>
> ​	必须保证将一个函数作为事件回调赋值给 `onXxx` 属性。

## 收集表单数据

**示例要求**

*需求：定义一个包含表单的组件*

* *输入用户名密码后，点击登录提示输入信息*

    ![](F:\ReactJs\01-basic\assets\收集表单数据.gif)

**基本理解**

包含表单的组件分类

* 1，**受控组件**：页面中所有输入类(包括checkbox、radio等) DOM 的值，随着用户的输入，就可以将数据维护到状态中去，当使用时，直接在状态中取，这就属于 受控组件。（<font color="#f00">类似于 Vue 的双向数据绑定</font>）

  ```jsx
  class Login extends React.Component {
      // 初始化状态
      state = {
          username: '', // 用户名
          password: '' // 密码
      }
      handleSubmit = (event) => {
          // 阻止表单提交
          event.preventDefault();
  
          const { username, password } = this.state
          alert(`你输入的用户名是${username}，你输入的密码是${password}`)
      }
      // 保存用户名到状态中
      saveUserName = (event) => {
          console.log(event.target.value);
          this.setState({ username: event.target.value })
      }
      // 保存密码到状态中
      savePassword = () => {
          this.setState({ password: event.target.value })
      }
      render () {
          return (
              <form onSubmit={this.handleSubmit}>
                  用户名：<input onChange={this.saveUsername} type="text" name="username" />
                  密&emsp;码：<input onChange={this.savePassword} type="password" name="password" />
                  <button>登录</button>
              </form>
          )
  	}
  }
  ```

* 2，**非受控组件**：页面中所有输入类(包括checkbox、radio等) DOM 的值，是现用现取的，就是 **非受控组件**

  ```jsx
  class Login extends React.Component {
      handleSubmit = (event) => {
          // 阻止表单提交
          event.preventDefault();
  
          const { username, password } = this
          alert(`你输入的用户名是${username.value}，你输入的密码是${password.value}`)
      }
      render () {
          return (
              <form onSubmit={this.handleSubmit}>
              	用户名：<input ref={c => this.username = c} type="text" name="username" />
                  密&emsp;码：<input ref={c => this.password = c} type="password" name="password" />
                  <button>登录</button>
  			</form>
  		)
  	}
  }
  ```

**示例优化**

**高阶函数和函数柯里化**

 **高阶函数**：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数
* 1，若 A 函数，接收的参数是一个函数，那么 A 就可以称之为 高阶函数
* 2，若 A 函数，调用的返回值依然是一个函数，那么 A 就可以称之为 高阶函数
* 常见的高阶函数有：Promise、setTimeout、arr.map() 等等

 **函数的柯里化**：通过函数调用继续返回函数的方式，实现多次接收参数，最后统一处理的函数编码形式

* 代码优化，如下所示：

  ```jsx
  class Login extends React.Component {
      // 初始化状态
      state = {
          username: '', // 用户名
          password: '' // 密码
      }
  
      handleSubmit = (event) => {
          // 阻止表单提交
          event.preventDefault();
  
          const { username, password } = this.state
          alert(`你输入的用户名是${username}，你输入的密码是${password}`)
      }
      
      // 保存表单数据到状态中
      saveFormData = (dataType) => {
          return (event) => {
              this.setState({ [dataType]: event.target.value })
          }
      }
  
      render () {
          return (
              <form onSubmit={this.handleSubmit}>
              {/* onChange 自动执行的是一个回调函数，因此 this.saveFormData('username') 必须要返回一个函数*/}
              用户名：<input onChange={this.saveFormData('username')} type="text" name="username" />
                  <br /><br />
                  密&emsp;码：<input onChange={this.saveFormData('password')} type="password" name="password" />
                      <br /><br />
                  <button>登录</button>
              </form>
          )
      }
  }
  ```

**不用柯里化的实现**

* 代码优化，如下所示：

  ```jsx
  class Login extends React.Component {
      // 初始化状态
      state = {
          username: '', // 用户名
          password: '' // 密码
      }
  
      handleSubmit = (event) => {
          // 阻止表单提交
          event.preventDefault();
  
          const { username, password } = this.state
          alert(`你输入的用户名是${username}，你输入的密码是${password}`)
      }
  
      // 保存表单数据到状态中
      saveFormData = (dataType, event) => {
          this.setState({ [dataType]: event.target.value })
      }
  
      render() {
          return (
              <form onSubmit={this.handleSubmit}>
                  {/* onChange 自动执行的是一个回调函数，因此 this.saveFormData('username') 必须要返回一个函数*/}
                  用户名：<input onChange={event => this.saveFormData('username', event)} type="text" name="username" />
                  <br /><br />
                  密&emsp;码：<input onChange={event => this.saveFormData('password', event)} type="password" name="password" />
                  <br /><br />
                  <button>登录</button>
              </form>
          )
      }
  }
  ```

  



## 组件的生命周期

**示例要求**

需求：定义组件实现以下功能：

* 1，让指定的文本做显示 / 隐藏的渐变动画
* 2，从完全可见，到彻底消失，耗时 2S
* 3，点击 “不活了” 按钮从界面中卸载组件

![](F:\ReactJs\01-basic\assets\component    生命周期.gif)

**基本理解**

* 1，组件从创建到死亡它会经历一些特定的阶段。
* 2，`React` 组件中包含一系列勾子函数(生命周期回调函数), 会在特定的时刻调用。
* 3，我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。

**基本实现**

* 引出生命周期，如下所示：

  ```jsx
  // 渲染组件
  // 生命周期回调函数 <=> 生命周期钩子函数 <=> 生命周期函数 <=> 生命周期钩子
  class Life extends React.Component {
      state = { opacity: 1 }
  
      death = () => {
          // 卸载组件
          ReactDOM.unmountComponentAtNode(document.getElementById('test'))
      }
  
      componentDidMount() {
          this.timer = setInterval(() => {
              // 获取原状态
              let { opacity } = this.state
              // 减小 0.1
              opacity -= 0.1
              if (opacity <= 0) opacity = 1
              // 设置新的透明度
              this.setState({ opacity })
          }, 200)
      }
  
      // 组件将要卸载
      componentWillUnmount () {
          // 清除定时器
          clearInterval(this.timer)
      }
  
      // 初始化渲染、状态更新之后
      render () {
          return (
              <div>
                  <h2 style={{ opacity: this.state.opacity }}>React 学不会，怎么办？</h2>
                  <button onClick={this.death}>不活了</button>
              </div>
          )
      }
  }
  // 渲染组件
  ReactDOM.render(<Life />, document.getElementById('test'))
  ```

### 生命周期流程图(旧)

 ![](F:\ReactJs\01-basic\assets\生命周期流程图（旧）.png)

**生命周期的三个阶段（旧）**

* **1 初始化阶段：**由 `ReactDOM.render()` 触发 --- 初次渲染

  * 1）constructor()
  * 2）componentWillMount()：组件将要挂载的钩子
  * 3）render()
  * 4）componentDidMount()：组件挂载完毕的钩子    ====> <font color="#f00">常用</font>
    *  一般在这个钩子中做一些**初始化**的事，例如：开启定时器、发送网络请求、订阅消息

* **2，更新阶段：**由组件内部 `this.setSate()` 或父组件重新 `render` 触发

  * 1）shouldComponentUpdate()：控制组件更新的“阀门”，默认返回 true，则状态改变时，更新组件；若设置返回 false，则状态改变时，不更新组件
  * 2）componentWillUpdate()：组件将要更新的钩子
  * 3）render()：=====> <font color="#f00">必须</font>
  * 4）componentDidUpdate()：组件更新完毕的钩子

  ><font color="#f00">注意：</font>
  >
  >* 不更改任何状态中的数据，强制更新时，使用 `this.forceUpdate()`，它不受 `shouldComponentUpdate()` 的控制
  >* **子组件** 中有一个单独的钩子，即 `componentWillReceiveProps `，接收 `props` 参数
  >  * 它是在组件将要接收新的 `props` 的时候，调用的钩子，即初次渲染时，不调用，传入新值时，才会调用

* **3，卸载组件：**由 `ReactDOM.unmountComponentAtNode()` 触发

  * 1）componentWillUnmount()：组件将要卸载的钩子    ====> <font color="#f00">常用</font>
    *  一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息

### 生命周期流程图(新)

 ![](F:\ReactJs\01-basic\assets\生命周期流程图（新）.png)

**生命周期的三个阶段（新）**

* **1，初始化阶段：**由 `ReactDOM.render()` 触发---初次渲染
  * 1）constructor()
  * **2）getDerivedStateFromProps()**
    * 静态方法，使用时需要 `static ` 关键字进行修饰
    * 接收两个参数 `props` 和 `state`
    * 必须要有返回值：要么是 `null` ，要么是 `state object`
    * 若 `state` 的值在任何时候都取决于 `props`，那么可以使用 getDerivedStateFromProps()
    * 派生状态会导致代码冗余，一般不建议使用
  * 3）render()
  * 4）componentDidMount()
* **2，更新阶段：** 由组件内部 `this.setSate()` 或父组件重新 `render` 触发
  * **1）getDerivedStateFromProps()**
  * 2）shouldComponentUpdate()
  * 3）render()
  * **4）getSnapshotBeforeUpdate**：在更新之前获取快照
    * 必须要有返回值：要么是 `null` ，要么是 `snapshot value`
      * 任何值都可以作为 `snapshot value` （快照值）
    * 接收两个参数 `prevProps` 和 `prevState`，即 未改变之前的 `props` 和 `states`
    * 返回值将作为参数传递给 `componentDidUpdate()`
  * 5）componentDidUpdate(prevProps, prevState, snapshotValue)
* **3，卸载组件：** 由 `ReactDOM.unmountComponentAtNode()` 触发
  * 1）componentWillUnmount()

### 重要的勾子

* 1，render()：初始化渲染或更新渲染调用
* 2，componentDidMount()：开启监听, 发送ajax请求
* 3，componentWillUnmount()：做一些收尾工作, 如: 清理定时器

### 即将废弃的勾子

* 1，componentWillMount
* 2，componentWillReceiveProps
* 3，componentWillUpdate

现在使用会出现警告，下一个大版本需要加上 `UNSAFE_` 前缀才能使用，以后可能会被彻底废弃，<font color="#f00">不建议使用</font> 。

## 虚拟DOM 与 DOM Diffing算法

**示例要求**

需求：验证虚拟 **DOM Diffing** 算法的存在

![](F:\ReactJs\01-basic\assets\component    虚拟DOM.gif)

**基本原理图**

![](F:\ReactJs\01-basic\assets\虚拟DOM 基本原理图.png)

 **经典面试题:**

**1，react/vue中的key有什么作用？（key的内部原理是什么？）**

* 1）简单的说: key 是 虚拟DOM 对象的标识，在更新显示时key起着极其重要的作用。

* 2）详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】，

  ​      随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

  * a. 旧虚拟DOM 中找到了与 新虚拟DOM 相同的 key ：
    * (1) 若 虚拟DOM 中内容没变，直接使用之前的真实DOM
    * (2) 若 虚拟DOM 中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM
  * b. 旧虚拟DOM 中未找到与 新虚拟DOM 相同的 key
    * 根据数据创建新的真实DOM，随后渲染到页面

**2，为什么遍历列表时，key 最好不要用 index ?**         

   用 index 作为 key 可能会引发的问题：

* 1）若对数据进行：逆序添加、逆序删除等破坏顺序操作：
  * 会产生没有必要的真实DOM更新  ==>  界面效果没问题，但效率低。
* 2）如果结构中还包含输入类的DOM：
  * 会产生错误DOM更新  ==>  界面有问题。
* 3）<font color="#f00">注意！</font>如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
  * 仅用于渲染列表用于展示，使用index作为key是没有问题的。

**3，开发中如何选择 key ?**

* 1）最好使用每条数据的唯一标识作为 key，比如 id、手机号、身份证号、学号等唯一值。
* 2）如果确定只是简单的展示数据，用 index 也是可以的。