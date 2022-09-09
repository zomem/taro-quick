/*
 * @Author: zomem 770552117@qq.com
 * @Date: 2022-04-21 17:18:07
 * @LastEditors: zomem 770552117@qq.com
 * @LastEditTime: 2022-05-18 11:50:38
 * @FilePath: /taro-quick-rn/src/checkbox/InnerCheckbox.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useCallback, ReactNode} from 'react'
import { Animated } from "react-native"
import {Flex, Text, Line, Box, Press} from '../Components'


export interface CheckboxProps {
  value: string | number
  children?: React.ReactNode
  onChange?: Function
}


interface CheckboxPropsNew extends CheckboxProps {
  selectList?: (string | number)[]
  type?: 'row' | 'col' | 'wrap'
  /** 选项字体颜色 */
  color?: string
  /** 选项字体大小 */
  fontSize?: string
  /** 选项按钮，未选中 */
  Icon?: ReactNode
  /** 选项按钮，已选中 */
  IconSelect?: ReactNode
  disable?: boolean
}



const InnerCheckbox = ({
  value, children, onChange=()=>{}, selectList=[], type,
  color='#060606', fontSize='32', disable=false,
  Icon, IconSelect
}: CheckboxPropsNew) => {

  const changeValues = useCallback(() => {
    let temp = [...selectList]
    if(temp.includes(value)){
      temp.splice(temp.findIndex(item => item === value), 1)
      return temp
    }
    return [...temp, value]
  }, [selectList.length, value])

  return (
    <Press 
      onClick={() => {
        if(disable) return
        onChange(changeValues())
      }}
    >
      <Flex opacity={disable ? '0.5' : '1'} flex='frsc' size={type === 'col' ? '100% auto' : 'auto auto'} padding='15 0' minHeight='65'>
        <Box position='relative' size='38 38' >
          <Animated.View 
            style={{
              opacity: selectList.includes(value) ? 1 : 0,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            }}
          >
            {IconSelect}
          </Animated.View>
          <Box position='absolute' top='0' left='0'>{Icon}</Box>
        </Box>
        <Line size='10 auto' />
        <Text fontSize={fontSize} color={color}>{children}</Text>
        {type === 'wrap' && <Line size='32 auto' />}
      </Flex>
    </Press>
  )
}

export default InnerCheckbox