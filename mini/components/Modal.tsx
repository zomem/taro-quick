import {ReactNode, useState, useEffect, useMemo, useRef} from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import {ZPX} from '../constants/constants'
import {TaroQuickAnimate} from './Components'

import './widget.css'

interface Modal {
  children?: ReactNode
  isShow?: boolean
  title?: string
  content?: string
  onCancel?: () => void
  onConfirm?: (e?: any) => void
  cancelTxt?: string
  confirmTxt?: string
  isHaveCancel?: boolean
  isHaveConfirm?: boolean
  size?: string

  bgColor?: string
  /** 标题的字体大小 */
  titleSize?: string
  /** 标题的字体颜色 */
  titleColor?: string
  /** 内容的字体大小 */
  contentSize?: string
  /** 内容的字体颜色 */
  contentColor?: string
  /** 按钮颜色 */
  buttonColor?: string
  /** 按钮大小 */
  buttonRadius?: string
  padding?: string
}

const animation = Taro.createAnimation({
  transformOrigin: "50% 50%",
  duration: 430,
  timingFunction: "ease",
  delay: 0
})

const Modal = (props: Modal) => {
  const {windowHeight, windowWidth} = useRef(Taro.getSystemInfoSync()).current

  const {
    isShow=false,
    title='',
    content='',
    onCancel=() => {}, 
    onConfirm=() => {},
    cancelTxt='取消',
    confirmTxt='确定',
    isHaveCancel=true,
    isHaveConfirm=true,
    children,
    size='600 auto',

    bgColor='rgba(255,255,255,0.89)',
    titleSize='32',
    titleColor='#060606',
    contentSize='28',
    contentColor='#060606',
    buttonColor='#1890ff',
    padding='30'
  } = props
  
  const [animate, setAnimate] = useState<TaroQuickAnimate>({actions: []})
  const [backSize, setBackSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if(isShow){
      setBackSize({
        width: windowWidth,
        height: windowHeight
      })
      animation.opacity(1).step()
      setAnimate(animation.export())
    }else{
      animation.opacity(0).step()
      setAnimate(animation.export())
      setTimeout(() => {
        setBackSize({
          width: 0,
          height: 0
        })
      }, 430);
    }
  }, [isShow, windowWidth, windowHeight])

  const msize = useMemo(() => {
    if(backSize.width === 0){
      return {
        width: 0,
        height: 0
      }
    }
    return {
      width: size ? (size.split(' ')[0].includes('auto') ? 'auto' : size.split(' ')[0].includes('%') ? size.split(' ')[0] : size.split(' ')[0] + ZPX) : 'auto',
      height: size ? (size.split(' ')[1].includes('auto') ? 'auto' : size.split(' ')[1].includes('%') ? size.split(' ')[1] : size.split(' ')[1] + ZPX) : 'auto',
    }
  }, [size, backSize.width])

  return(
    <View
      animation={animate}
      style={{
        width: backSize.width + 'px',
        height: backSize.height + 'px',
      }}
      className='_modal_back'
      onClick={() => {
        onCancel()
      }}
    >
      <View 
        className='_modal_content'
        style={{
          backgroundColor: bgColor,
          padding: padding ? (padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
          ...msize
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {
          title &&
          <View className='_modal_title' style={{fontSize: titleSize, color: titleColor}}>
            {title}
          </View>
        }
        <View className='_modal_cancel_txtcon'>
          {
            children ? children :
            <Text className='_modal_tile_des' style={{fontSize: contentSize, color: contentColor}}>{content}</Text>
          }
        </View>
        
        {
          (isHaveCancel || isHaveConfirm) &&  
          <View className='_modal_cancel_confirm' >
            {
              isHaveCancel &&
              <View 
                className='_modal_cancel'
                style={{
                  border: `1px solid ${buttonColor}`,
                  borderRadius: props.buttonRadius ? (props.buttonRadius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
                  marginRight: isHaveCancel ? '100' + ZPX : 0
                }}
                hoverClass='_modal_hover'
                onClick={() => {
                  onCancel()
                }}
              >
                {cancelTxt}
              </View>
            }
            {
              isHaveConfirm &&
              <Button 
                className='_modal_confirm'
                style={{
                  width: isHaveCancel ? '280rpx' : '360rpx',
                  backgroundColor: buttonColor,
                  border: `1px solid ${buttonColor}`,
                  borderRadius: props.buttonRadius ? (props.buttonRadius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
                }}
                hoverClass='_modal_hover'
                onClick={() => {
                  onConfirm()
                }}
              >
                {confirmTxt}
              </Button>
            }
          </View>
        }
      </View>
    </View>
  )
}

export default Modal