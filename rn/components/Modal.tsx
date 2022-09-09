import React, {ReactNode, useState, useEffect, useRef, useMemo} from 'react'
import { Animated, Dimensions } from "react-native"
import { View, Button, Text, ScrollView } from '@tarojs/components-rn'
import {RTX} from '../constants/constants'
import {changeS2} from '../constants/utils'


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
  buttonSize?: string
  buttonRadius?: string
}

const {width, height} = Dimensions.get('window')

export default (props: Modal) => {
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

    bgColor='rgba(255,255,255,1)',
    titleSize='32',
    titleColor='#060606',
    contentSize='28',
    contentColor='#060606',
    buttonColor='#1890ff',
    buttonSize='190 76',
    buttonRadius='15'
  } = props
  
  
  const [backSize, setBackSize] = useState({
    width: 0,
    height: 0,
  })

  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 460,
      useNativeDriver: true
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 460,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    if(isShow){
      setBackSize({
        width: width,
        height: height
      })
      fadeIn()
    }else{
      fadeOut()
      setTimeout(() => {
        setBackSize({
          width: 0,
          height: 0
        })
      }, 500);
    }
  }, [isShow, width, height])


  const msize = useMemo(() => {
    if(backSize.width === 0){
      return {
        width: 0,
        height: 0
      }
    }
    return {
      width: size ? changeS2(size)[0] : 'auto',
      height: size ? changeS2(size)[1] : 'auto',
    }
  }, [size, backSize.width])


  return(
    <Animated.View
      style={{
        width: backSize.width,
        height: backSize.height,
        opacity: fadeAnim,
      }}
      className='_modal_back'
    >
      <View
        style={{
          width: backSize.width,
          height: backSize.height,
        }}
        className='_modal_back2'
        onClick={() => {
          onCancel()
        }}
      >
        <View 
          className='_modal_content'
          style={{
            backgroundColor: bgColor,
            borderRadius: 25 * RTX,
            paddingLeft: 30 * RTX,
            paddingTop: 30 * RTX,
            paddingRight: 30 * RTX,
            paddingBottom: 30 * RTX,
            ...msize
          }}
          onClick={() => {}}
        >
          {
            backSize.width > 0 &&
            <View>
              <View 
                className='_modal_title' 
                style={{
                  marginBottom: 30 * RTX,
                }}
              >
                <Text style={{fontSize: +titleSize * RTX, color: titleColor, fontWeight: 'bold'}}>{title}</Text>
              </View>
              <ScrollView
                scrollY
                className='_modal_cancel_txtcon'
              >
                {
                  children ? children :
                  <Text className='_modal_tile_des' style={{fontSize: +contentSize * RTX, color: contentColor}}>{content}</Text>
                }
              </ScrollView>
              
              {
                (isHaveCancel || isHaveConfirm) &&  
                <View 
                  className='_modal_cancel_confirm'
                  style={{
                    width: '100%',
                    paddingLeft: 30 * RTX,
                    paddingTop: 0 * RTX,
                    paddingRight: 30 * RTX,
                    paddingBottom: 0 * RTX,
                    marginTop: 30 * RTX,
                  }}
                >
                  {
                    isHaveCancel &&
                    <View 
                      className='_modal_cancel'
                      style={{
                        width: buttonSize ? changeS2(buttonSize)[0] : 'auto',
                        height: buttonSize ? changeS2(buttonSize)[1] : 'auto',
                        borderWidth: 1,
                        borderColor: buttonColor,
                        borderRadius: +buttonRadius * RTX,
                        marginRight: isHaveConfirm ? 60 * RTX : 0
                      }}
                      hoverClass='_modal_hover'
                      onClick={() => {
                        onCancel()
                      }}
                    >
                      <Text style={{fontSize: +contentSize * RTX, color: '#8c8c8c'}}>{cancelTxt}</Text>
                    </View>
                  }
                  {
                    isHaveConfirm &&
                    <Button 
                      className='_modal_confirm'
                      style={{
                        width: buttonSize ? changeS2(buttonSize)[0] : 'auto',
                        height: buttonSize ? changeS2(buttonSize)[1] : 'auto',
                        borderRadius: +buttonRadius * RTX,
                        backgroundColor: buttonColor,
                        borderWidth: 1,
                        borderColor: buttonColor,
                      }}
                      hoverClass='_modal_hover'
                      onClick={() => {
                        onConfirm()
                      }}
                    >
                      <Text style={{fontSize: +contentSize * RTX, color: '#ffffff'}}>{confirmTxt}</Text>
                    </Button>
                  }
                </View>
              }
            </View>
          }
        </View>
      </View>
    </Animated.View>
  )
}

