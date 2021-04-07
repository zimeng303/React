import React, { Component } from 'react'
// 引入connect用于链接UI组件与redux
import { connect } from 'react-redux'
// 引入action
import { 
  createIncrementAction, 
  createDecrementAction, 
  createIncrementAsyncAction 
} from '../../redux/count_action'

// 定义UI组件
class Count extends Component {

  state = { carName: '奔驰c63' }

  // 加法
  increment = () => {
    const { value } = this.selectNumber
    this.props.increment(value*1)
  }

  // 减法
  decrement = () => {
    const { value } = this.selectNumber
    this.props.decrement(value*1)
  }

  // 当前求和为奇数再加
  incrementIfOdd = () => {
    const { value } = this.selectNumber
    if (this.props.count % 2 !== 0) {
      this.props.increment(value*1)
    }
  }

  // 异步加
  incrementAsync = () => {
    const { value } = this.selectNumber
    this.props.incrementAsync(value*1, 500)
  }

  render() {
    return (
      <div>
        <h1>当前求和为：{ this.props.count }</h1>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
}

// 使用connect()()创建并暴露一个Count的容器组件
// connect()的参数必须是函数
export default connect( 
  state => ({ count: state }), 
  // mapDispatchToProps 的一般写法
  /* dispatch => ({
    increment: number => dispatch(createIncrementAction(number)),
    decrement: number => dispatch(createDecrementAction(number)),
    incrementAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time))
  }) */

  // mapDispatchToProps 的简写：
  {
    increment: createIncrementAction, // react-redux 可以自动调用dispatch，实现自动分发
    decrement: createDecrementAction,
    incrementAsync: createIncrementAsyncAction
  }
)(Count)
