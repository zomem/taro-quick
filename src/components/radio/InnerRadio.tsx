import React, {ReactNode, useEffect, useState} from 'react'
import Taro from '@tarojs/taro'
import {Flex, Animate, Text, Line, Box, TaroQuickAnimate} from '../Components'

export interface RadioProps {
  value: string | number
  children?: ReactNode
  onChange?: Function

  /** 选项字体颜色 */
  color?: string
  /** 选项字体大小 */
  fontSize?: string
  /** 选项按钮，未选中 */
  Icon?: ReactNode
  /** 选项按钮，已选中 */
  IconSelect?: ReactNode
}

interface RadioPropsNew extends RadioProps {
  select?: string | number
  type?: 'row' | 'col'
}

const animation = Taro.createAnimation({
  transformOrigin: "50% 50%",
  duration: 150,
  timingFunction: 'linear',
})

const InnerRadio: React.FC<RadioPropsNew> = ({
  value, children, onChange=()=>{}, select, type,
  color='#060606', fontSize='32',
  Icon, IconSelect
}) => {

  const [animate, setAnimate] = useState<TaroQuickAnimate>({actions: []})

  useEffect(() => {
    if(select === value){
      setAnimate(animation.opacity(1).step().export())
    }else{
      setAnimate(animation.opacity(0).step().export())
    }
  }, [select, value])

  return (
    <Flex flex='frsc' size={type === 'col' ? '100% auto' : 'auto auto'} padding='15 0' minHeight='65' onClick={() => {onChange(value)}}>
      <Box position='relative'>
        <Animate animation={animate} opacity='0' position='absolute' top='0' left='0'>
          {IconSelect}
        </Animate>
        <Box position='absolute' top='0' left='0'>{Icon}</Box>
      </Box>
      <Line size='12 auto' flexShrink='0' />
      <Text fontSize={fontSize} color={color}>{children}</Text>
    </Flex>
  )
}

export default InnerRadio