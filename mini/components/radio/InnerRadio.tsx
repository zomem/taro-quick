import React, {ReactNode, useEffect, useState} from 'react'
import Taro from '@tarojs/taro'
import {Flex, Animate, Text, Line, Box, TaroQuickAnimate} from '../Components'

export interface RadioProps {
  value: string | number
  children?: ReactNode
  onChange?: Function
}

interface RadioPropsNew extends RadioProps {
  select?: string | number
  type?: 'row' | 'col'
  /** 选项字体颜色 */
  color?: string
  /** 选项字体大小 */
  fontSize?: string
  /** 选项按钮，未选中 */
  Icon?: ReactNode
  /** 选项按钮，已选中 */
  IconSelect?: ReactNode
  /** itemMinHeight  每个项的最小高度 */
  itemMinHeight?: string
}

const animation = Taro.createAnimation({
  transformOrigin: "50% 50%",
  duration: 150,
  timingFunction: 'linear',
})

const InnerRadio = ({
  value, children, onChange=()=>{}, select, type,
  color='#060606', fontSize='32',
  Icon, IconSelect, itemMinHeight="65"
}: RadioPropsNew) => {

  const [animate, setAnimate] = useState<TaroQuickAnimate>({actions: []})

  useEffect(() => {
    if(select === value){
      setAnimate(animation.opacity(1).step().export())
    }else{
      setAnimate(animation.opacity(0).step().export())
    }
  }, [select, value])

  return (
    <Flex flex='frsc' size={type === 'col' ? '100% auto' : 'auto auto'} padding='15 0' minHeight={itemMinHeight} onClick={() => {onChange(value)}}>
      <Box position='relative' size='38 38' flexShrink='0'>
        <Animate animation={animate} opacity='0' position='absolute' top='0' left='0' zIndex='1'>
          {IconSelect}
        </Animate>
        <Box position='absolute' top='0' left='0'>{Icon}</Box>
      </Box>
      <Line size='12 auto' flexShrink='0'/>
      <Text fontSize={fontSize} color={color}>{children}</Text>
    </Flex>
  )
}

export default InnerRadio