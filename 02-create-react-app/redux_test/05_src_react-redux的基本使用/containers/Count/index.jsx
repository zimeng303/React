// 引入Count的UI组件
import CountUI from '../../components/Count'

// 引入connect用于链接UI组件与redux
import { connect } from 'react-redux'
// 引入action
import { 
  createIncrementAction, 
  createDecrementAction, 
  createIncrementAsyncAction 
} from '../../redux/count_action'

/* 
  1. mapStateToProps函数返回的是一个对象；
  2. 返回的对象中的key就作为传递给UI组件 props 的 key，value就作为传递给UI组件props的value
  3. mapStateToProps 用于传递状态
  4. react-redux 已经自动调用了 store.getState()，即已经作为参数传入到 mapStateToProps 函数中
*/
const mapStateToProps = (state) => {
  return {
    count: state
  }
}

/* 
  1. mapDispatchToProps函数返回的是一个对象；
  2. 返回的对象中的key就作为传递给UI组件 props 的 key，value就作为传递给UI组件props的value
  3. mapStateToProps 用于传递操作状态的方法
  4. react-redux 已经自动将 store.dispatch 作为参数传入到 mapDispatchToProps 函数中
*/
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (number) => {
      // 通知redux执行加法
      dispatch(createIncrementAction(number))
    },
    decrement: (number) => {
      dispatch(createDecrementAction(number))
    },
    incrementAsync: (number, time) => {
      dispatch(createIncrementAsyncAction(number, time))
    }
  }
}

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
