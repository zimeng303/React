/* 
  该文件专门为count组件生成action对象
*/
import { INCREMNET, DECREMENT } from './contant'

export const createIncrementAction = data => ({ type: INCREMNET, data }) 
export const createDecrement = data => ({ type: DECREMENT, data })

