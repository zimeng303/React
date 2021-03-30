import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  search = () => {
    // 获取用户的输入(连续解构赋值 + 重命名)
    const { keyWordElement: {value: keyWord} } = this
    // 发送请求前通知 List 更新状态    
    PubSub.publish('atguigu', { isFirst: false, isLoading: true })
    // 发送网络请求
    axios.get(`/search/users?q=${keyWord}`).then(
      response => {
        // 请求成功后通知 List 更新状态
        PubSub.publish('atguigu', { isLoading: false, users: response.data.items })
      },
      error => {
        // 请求失败后通知 List 更新状态
        PubSub.publish('atguigu', { isLoading: true, err: error.message })
      }
    )
  }

  render () {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索 GitHub 用户</h3>
        <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索" />&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}
