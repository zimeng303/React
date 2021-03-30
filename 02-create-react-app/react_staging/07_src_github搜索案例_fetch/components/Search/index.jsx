import React, { Component } from 'react'
// import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  search = async () => {
    // 获取用户的输入(连续解构赋值 + 重命名)
    const { keyWordElement: {value: keyWord} } = this
    // 发送请求前通知 List 更新状态    
    PubSub.publish('atguigu', { isFirst: false, isLoading: true })
    //#region  发送网络请求 --- 使用 axios 发送
    /* axios.get(`/search/users?q=${keyWord}`).then(
      response => {
        // 请求成功后通知 List 更新状态
        PubSub.publish('atguigu', { isLoading: false, users: response.data.items })
      },
      error => {
        // 请求失败后通知 List 更新状态
        PubSub.publish('atguigu', { isLoading: true, err: error.message })
      }
    ) */
    //#endregion
    
    //#region 
    // 发送网络请求 --- 使用 fetch 发送（未优化版本）
    /* fetch(`/search/users?q=${keyWord}`).then(
      response => {
        console.log('成功', response.json()) 
        return response.json()
      },
      error => {
        console.log('失败', error)
        return new Promise(() => {})
      }
    ).then(
      response => {
        console.log('获取数据成功：', response);
      },
      error => {
        console.log('获取数据失败：', error);
      }
    ) */
    //#endregion
    
    //#region 
    // 发送网络请求 --- 使用 fetch 发送（错误优化版本）
    /* fetch(`/search/users?q=${keyWord}`).then(
      response => {
        console.log('成功', response.json()) 
        return response.json()
      }
    ).then(
      response => {
        console.log('获取数据成功：', response);
      }
    ).catch(
      error => {
        console.log('请求出错：', error);
      }
    ) */
    //#endregion

    // 发送网络请求 --- 使用 fetch 发送（ async / await 优化版本）
    try {
      const response = await fetch(`/search/users?q=${keyWord}`)
      const data = await response.json()
      PubSub.publish('atguigu', { isLoading: false, users: data.items })
    } catch (error) {
      PubSub.publish('atguigu', { isLoading: true, err: error.message })
    }
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
