import { RTX } from "../../constants/constants"
import { Column } from "./Table"

export const DEFAULT_WIDTH = '200'
export const DEFAULT_HEIGHT = '86'
/** 
 * 
 * 从 cloumns 数组中，取出 dataIndex 和 key 相同的值
 */
export const getCloumnsItemByKey = (columns: Column[], key) => {
  let temp = columns.filter((item) => item.dataIndex === key)
  return temp[0] || {}
}

/**
 * 将 dataSource 里面的 item 数据的顺序，转成 columns 里 dataIndex 数据顺序一致
 */
export const reOrderDataSource = (dataSource: any[], columns: Column[]) => {
  let tempArr: any = []
  let rowWidth: number = 0, isWidth: boolean = false
  for(let i = 0; i < dataSource.length; i++){
    let o = {}, tempdata = dataSource[i]
    o['_column_item_record'] = tempdata
    for(let c of columns){
      if(tempdata[c['dataIndex']]){
        o[c['dataIndex']] = tempdata[c['dataIndex']]
        o['_column_' + c['dataIndex']] = {
          width: c['width'],
          flex: c['flex'],
          render: c['render'],
          textLine: c['textLine'],
        }
      }else{
        o[c['dataIndex']] = typeof(tempdata[c['dataIndex']]) === 'number' ? tempdata[c['dataIndex']] : null
        o['_column_' + c['dataIndex']] = {}
      }
      if(!isWidth) rowWidth += parseInt(c['width'] || DEFAULT_WIDTH)
    }
    o['_column_row_width'] = rowWidth * RTX
    isWidth = true
    tempArr.push(o)
  }
  return tempArr
}

/**
 * sort  排序
 */
export const sortBy = (data: any, key: string, sort: -1 | 0 | 1) => {
  let newdata = JSON.parse(JSON.stringify(data))
  if(sort === 1){
    newdata.sort((a,b) => a[key] - b[key])
  }
  if(sort === -1){
    newdata.sort((a,b) => b[key] - a[key])
  }
  return newdata
}

/**
 * 获取筛选的数据列表
 */
export const getScreenData = (dataSource: any[], columns: Column[]) => {
  let screenData: any = {}
  for(let i = 0; i < columns.length; i++){
    if(columns[i].screen){
      screenData[columns[i]['dataIndex']] = []
      screenData['_' + columns[i]['dataIndex']] = []
    }
  }
  for(let j = 0; j < dataSource.length; j++){
    for(let d in dataSource[j]){
      if(typeof(screenData[d]) !== 'undefined'){
        if(screenData[d].indexOf(dataSource[j][d]) === -1){
          screenData[d].push(dataSource[j][d])
        }
      }
    }
  }
  return screenData
}


/**
 * 筛选数据
 */
export const screenBy = (data: any[], key: string, list: string[]) => {
  let temp: any[] = []
  for(let i = 0; i < data.length; i++){
    if(list.includes(data[i][key])){
      temp.push(data[i])
    }
  }
  return temp
}

