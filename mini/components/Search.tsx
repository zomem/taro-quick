import React, {ReactNode, useEffect, useState} from 'react'
import Taro from '@tarojs/taro'
import {View, Input, Block} from '@tarojs/components'


import {Line, TaroQuickAnimate} from './Components'
import { ZPX } from '../constants/constants'
import './widget.css'


interface ISearchProps {
  type?: 'default' | 'input'
  value?: string
  placeholder?: string
  onInput?: Function
  onConfirm?: Function

  /** 当 type='default' 时，有点击事件。可以跳转搜索页面 */
  onClick?: (event: any) => void

  /** 提示文字的颜色 */
  placeholderColor?: string
  /** 字体颜色 */
  color?: string

  /** 搜索 icon */
  IconSearch?: ReactNode

  /** 搜索框的背景色 */
  bgColor?: string
  /** 搜索框的圆角度数 只能传数值 */
  radius?: string

  /** 搜索 icon 左边初始的距离。用于调整默认状态下的居中 */
  iconLeft?: string

  /** 搜索框的 阴影颜色 */
  shadowColor?: string
}


let A1 = Taro.createAnimation({
  duration: 500,
  timingFunction: "ease",
})


const Search = (props: ISearchProps) => {

  const {
    placeholder='请输入要搜索的内容', bgColor='#ffffff', radius='43', 
    type='input', value, onInput=() => {}, onConfirm=() => {}, IconSearch,
    placeholderColor='#bfbfbf', color='#060606', iconLeft='170', shadowColor,
    onClick=()=>{}
  } = props

  const [isInputing, setIsInputing] = useState(false)
  const [animate, setAnimate] = useState<TaroQuickAnimate>({actions: []})
  const [isShowInput, setIsShowInput] = useState(false)


  useEffect(() => {
    if(isInputing){
      A1.left('25' + ZPX).step()
      setTimeout(() => {
        setAnimate(A1.export())
      }, 10)
      setTimeout(() => {
        setIsShowInput(true)
      }, 510);
    }else{
      A1.left(iconLeft + ZPX).step()
      setTimeout(() => {
        setAnimate(A1.export())
      }, 10)
      setTimeout(() => {
        setIsShowInput(false)
      }, 510);
    }
  }, [isInputing, iconLeft])


  useEffect(() => {
    if(value){
      setIsInputing(true)
    }
  }, [value])

  return(
    <Block>
      {
        {
          'default': (
            <View 
              className='_search_all'
              hoverClass='hover-op'
              onClick={onClick}
            >  
              <View 
                className='_search_con_d'
                style={{
                  backgroundColor: bgColor,
                  borderRadius: radius + ZPX,
                  boxShadow: props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none'
                }}
              >
                <View className='_search_con_i'>
                  {IconSearch}
                  <Line size='5 auto' />
                  <View className='_search_input' style={{color: placeholderColor}}>{placeholder}</View>
                </View>
              </View>
            </View>
          ),
          'input': (
            <View 
              className='_search_all'
            >  
              <View 
                className='_search_con'
                style={{
                  backgroundColor: bgColor,
                  borderRadius: radius + ZPX,
                  boxShadow: props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none'
                }}
              >
                <View animation={animate} className='_search_con_i' style={{left: iconLeft + ZPX}}>
                  {IconSearch}
                  <Line size='5 auto' />
                  <View
                    className='_search_input'
                    style={{color: placeholderColor}}
                    onClick={() => {
                      if(isInputing) return
                      setIsInputing(true)
                    }}
                  >
                    <Input 
                      disabled={!isShowInput}
                      className='_search_input_l'
                      style={{color: color}}
                      confirmType='search'
                      placeholder={placeholder}
                      value={value}
                      focus={isShowInput ? true : false}
                      placeholderStyle={`color: ${placeholderColor}; font-size: 32${ZPX};`}
                      onBlur={() => {
                        if(value) return
                        setIsInputing(false)
                        setIsShowInput(false)
                      }}
                      onInput={(e) => {
                        onInput(e.detail.value)
                      }}
                      onConfirm={() => {
                        onConfirm()
                      }}
                    />
                  </View>
                </View>
              </View>
          </View>
          ),
        }[type]
      }
    </Block>

  )
}


export default Search