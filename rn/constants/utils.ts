import {RTX} from './constants'

// 样式 rn 的 padding margin border siae
export const changeS4 = (str?: string) => {
  if(!str) return [0, 0, 0, 0]
  let result: number[] = new Array(4)
  let temp = str.replace(/\s/g, ' ').split(' ')

  if(temp.length === 1){
    result[0] = +temp[0] * RTX
    result[1] = +temp[0] * RTX
    result[2] = +temp[0] * RTX
    result[3] = +temp[0] * RTX
  }
  if(temp.length === 2){
    result[0] = +temp[0] * RTX
    result[1] = +temp[1] * RTX
    result[2] = +temp[0] * RTX
    result[3] = +temp[1] * RTX
  }
  if(temp.length === 4){
    result[0] = +temp[0] * RTX
    result[1] = +temp[1] * RTX
    result[2] = +temp[2] * RTX
    result[3] = +temp[3] * RTX
  }
  return result
}
export const changeS2 = (str?: string) => {
  if(!str) return [0, 0]
  let result: number[] | string[] = new Array(2)
  let temp = str.replace(/\s/g, ' ').split(' ')

  if(temp.length === 1){
    // result[0] = +temp[0]
    // result[1] = +temp[0]
  }
  if(temp.length === 2){
    result[0] = temp[0].includes('auto') ? 'auto' : temp[0].includes('%') ? temp[0] : +temp[0] * RTX
    result[1] = temp[1].includes('auto') ? 'auto' : temp[1].includes('%') ? temp[1] : +temp[1] * RTX
  }
  return result
}

