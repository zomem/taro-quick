import React, { useEffect, useState, memo } from 'react'
import Taro from '@tarojs/taro'
import {Box, Press, Flex, Line, TextEllipsis} from '../Components'


interface TablePopProps {
  isShow?: 1 | 0 | -1 // 1 为动画show, 0为动画不显示，-1为无动画不显示
  itemList?: (string | number | null | undefined)[]
  selectList?: (string | number | null | undefined)[]
  left?: string
  top?: string
  width?: string
  themeColor: string  // 标题栏，线条的颜色
  onChange: Function

  /** 线条颜色 */
  lineColor?: string  
  /** 标题栏，背景色 */
  titleBgColor?: string
  /** 部分点击时的，hover效果 */
  hoverColor?: string
  /** 复选框，未激活 */
  IconSelect?: React.ReactNode
  /** 复选框，激活 */
  IconSelectActive?: React.ReactNode
  color?: string
  fontSize?: string
}


const showAnimate = Taro.createAnimation({
  transformOrigin: "50% 50%",
  timingFunction: 'ease-in-out',
  duration: 300,
})


const TablePop = ({
  isShow=0, itemList=[], selectList=[], left='50', top='80', width='200', themeColor, onChange=() => {},
  lineColor, titleBgColor, hoverColor, IconSelect, IconSelectActive, color, fontSize='32'
}: TablePopProps) => {

  const [animate, setAnimate] = useState<TaroQuickAnimate>({actions: []})
  const [popStyle, setPopStyle] = useState({
    size: '0 0',
    z: '-1'
  })


  useEffect(() => {
    if(isShow === 1){
      setPopStyle({size: width + ' auto', z: '20'})
      setAnimate(showAnimate.opacity(1).step().export())
    }else if(isShow === 0){
      setAnimate(showAnimate.opacity(0).step().export())
      setTimeout(() => {
        setPopStyle({size: '0 0', z: '-1'})
      }, 300);
    }else{
      setAnimate(showAnimate.opacity(0).step({duration: 0}).export())
      setPopStyle({size: '0 0', z: '-1'})
    }
  }, [isShow, width])

  return (
    <Animate size={popStyle.size} animation={animate} position='absolute' top={top} left={left} zIndex={popStyle.z}>
      <Box 
        size='100% 100%'
        maxHeight='320'
        bgColor={titleBgColor}
        radius='15'
        padding='20 0'
        shadowColor={lineColor}
        backdrop='20'
      >
        <Box maxHeight='280' size='100% 100%' overflow='hidden scroll'>
          {
            itemList.map((item) => (
              <Press 
                key={item}
                hoverBgColor={hoverColor}
                onClick={(e) => {
                  e.stopPropagation()
                  let temp = [...selectList]
                  let index = temp.indexOf(item)
                  if(index > -1){
                    temp.splice(index, 1)
                  }else{
                    temp.push(item)
                  }
                  onChange(temp)
                }}
              >
                <Flex flex='frsc' size='100% 58' padding='0 12'>
                  {
                    selectList.includes(item) ?
                    IconSelectActive
                    :
                    IconSelect
                  }
                  <Line size='10 2' />
                  <TextEllipsis line='1' fontSize={`${(+fontSize - 4)}`} color={color}>{item}</TextEllipsis>
                </Flex>
              </Press>
            ))
          }
        </Box>
      </Box>
    </Animate>
  )
}


export default memo(TablePop) as React.ElementType<TablePopProps>