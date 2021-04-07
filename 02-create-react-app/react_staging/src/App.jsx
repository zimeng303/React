import React, { Component } from 'react'
import { Button, DatePicker } from 'antd'
import { WechatOutlined, SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker;

export default class App extends Component {

  onChange = (ele) => {
    console.log(ele);
  }

  render() {
    return (
      <div>
        App...
        <button>点我</button> &nbsp;
        <Button type="primary">Primary Button</Button>
        <Button>default Button</Button>
        <Button type="link">link Button</Button>
        <WechatOutlined />
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <DatePicker onChange={this.onChange} />
        <RangePicker />
      </div>
    )
  }
}
