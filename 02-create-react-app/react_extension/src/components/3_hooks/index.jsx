import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//#region 
// 类式组件
/* class Demo extends Component {
  
  state = { count: 0 }  

  myRef = React.createRef()

  add = () => {
    this.setState(state => ({ count: state.count + 1 }))
  }

  unmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('app'))
  }

  show = () => {
    console.log(this.myRef.current.value); 
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState( state => ({count: state.count + 1}) )
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.myRef}/>
        <h2>当前求和为：{ this.state.count }</h2>
        <button onClick={this.add}>点我加1</button>
        <button onClick={this.unmount}>卸载组件</button>
        <button onClick={this.show}>点击展示数据</button>
      </div>
    )
  }
} */
//#endregion

//#region 
function Demo() {

  const [count, setCount] = React.useState(0)

  const myRef = React.useRef()

  React.useEffect(() => {
    let timer = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => { // 返回的函数相当于 componentWillUnmount 生命钩子
      clearInterval(timer)
    }
  }, [count])

  // 加的回调
  function add() {
    // setCount(count + 1) // 第一种写法
    setCount(count => count + 1)
  }

  // 卸载组件的回调
  function unmount () {
    ReactDOM.unmountComponentAtNode(document.getElementById('app'))
  }
  
  // 提示输入的回调
  function show () {
    console.log(myRef.current.value);
  }

  return (
    <div>
      <input type="text" ref={myRef}/>
      <h2>当前求和为：{count}</h2>
      <button onClick={add}>点我加1</button>
      <button onClick={unmount}>卸载组件</button>
      <button onClick={show}>点击展示数据</button>
    </div>
  )
}
//#endregion

export default Demo