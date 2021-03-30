// 创建 "外壳" 组件App
import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

// 创建并暴露 App 组件
export default class App extends Component {
  // 状态在哪里，操作状态的方法就在哪里

  state = { todos: [
    { id: '001', name: '吃饭', done: true },
    { id: '002', name: '睡觉', done: true },
    { id: '003', name: '打代码', done: false }
  ]}

  // addTodo 用于添加一个 todo，接收的参数是 todo 对象
  addTodo = (todoObj) => {
    // 1. 获取原 todos
    const { todos } = this.state
    // 2. 追加一个 todo
    const newTodos = [todoObj, ...todos]
    // 3. 更新状态
    this.setState({ todos: newTodos })
  }

  // updateTodo用于更新一个 todo 对象
  updateTodo = (id, done) => {
    // 获取状态中的 todos
    const { todos } = this.state
    // 匹配处理数据
    const newTodos = todos.map(todoObj => {
      if (todoObj.id === id) return {...todoObj, done}
      else return todoObj
    })
    this.setState({ todos: newTodos })
  }

  // deleteTodo 用于删除一个 todo 对象
  deleteTodo = id => {
    // 获取原来的 todos
    const { todos } = this.state
    // 删除指定id的 todo 对象
    const newTodos = todos.filter(todoObj => todoObj.id !== id)
    // 更新状态
    this.setState({ todos: newTodos })
  }

  checkAllTodo = done => {
    // 获取原来的 todos
    const { todos } = this.state
    // 加工数据
    const newTodos = todos.map(todoObj => { 
      return {...todoObj, done}
    })
    // 更新状态
    this.setState({ todos: newTodos })
  }

  // clearAllDone 用于清除所有已完成任务
  clearAllDone = () => {
    // 获取原来的 todos
    const { todos } = this.state
    // 过滤数据
    const newTodos = todos.filter(todoObj => !todoObj.done)
    // 更新状态
    this.setState({ todos: newTodos })
  }

  render() {
    const { todos } = this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
        </div>
      </div>
    )
  }
}