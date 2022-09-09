import React, {useMemo} from 'react'
import {Block, Text} from './Components'


interface Highlight{
  /** 文本内容 */
  content: string
  /** 要高亮的关键字 */
  keyword?: string

  /** 字体大小 */
  fontSize?: string
  /** 文本字体颜色 */
  color?: string
  /** 高亮字体颜色 */
  highColor?: string
}

const Highlight = (props: Highlight) => {
  const {content, keyword, fontSize='32', color='#060606', highColor='#ff2c2c'} = props

  const txtList = useMemo(() => {
    if(!keyword){
      return [content]
    }
    let all: string[] = []
    let arr1 = content.split(keyword)
    for(let i = 0; i < arr1.length; i++){
      all.push(arr1[i])
      if(i < arr1.length - 1){
        all.push(keyword)
      }
    }
    return all
  }, [content, keyword])

  return (
    <Block>
      {
        txtList.map((item, index) => {
          if(item === keyword){
            return (
              <Text key={index} fontSize={fontSize} color={highColor}>{item}</Text>
            )
          }else{
            return(
              <Text key={index} fontSize={fontSize} color={color}>{item}</Text>
            )
          }
        })
      }
    </Block>
  )
}



export default Highlight