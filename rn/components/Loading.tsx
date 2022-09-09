import React, {} from 'react'
import {ActivityIndicator} from 'react-native'
import {View} from '@tarojs/components-rn'
import {Text} from './Components'

import './widget.css'


interface LoadingProps {
  title?: string
  type?: 'three_bounce' | 'fading_circle'
  fontSize?: string
  color?: string
  /** 加载动画的颜色 */
  loadColor?: string
}

export default (props: LoadingProps) => {
  const { title, fontSize='26', color='#060606', loadColor='#1890ff' } = props

  return(
    <View className='_loading_all'>
      {
        title ? (
          <Text fontSize={fontSize} color={color}>{title}</Text>
        ) : (
          <ActivityIndicator color={loadColor} animating={true} />
        )
      }
    </View>
  )
}

