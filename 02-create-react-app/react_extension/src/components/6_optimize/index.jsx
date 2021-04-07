import React, { PureComponent } from 'react'
import './index.css'

export default class Parent extends PureComponent {

  state = { carName: '奔驰c63' }

  changeCar = () => {
    // this.setState({ carName: '迈巴赫' })
    
    const obj = this.state
    obj.carName = '迈巴赫'
    this.setState(obj)
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props, this.state); // 目前的props和state
    console.log(nextProps, nextState); // 接下来变化的目标props，目标state
    return this.state.carName !== nextState.carName
  } */

  render() {
    const { carName } = this.state
    return (
      <div className="parent">
        <h3>我是Parent组件</h3>
        <p>我的车的名字是：{carName}</p>
        <button onClick={this.changeCar}>点我换车</button>
        <Child carName="奥拓" />
      </div>
    )
  }
}

class Child extends PureComponent {

  
  /* shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props, this.state); // 目前的props和state
    console.log(nextProps, nextState); // 接下来变化的目标props，目标state
    return this.props.carName === nextProps.carName
  } */

  render() {
    return (
      <div className="child">
        <h3>我是Child组件</h3>
        <p>我接到的车是：{this.props.carName}</p>
      </div>
    )
  }
}
