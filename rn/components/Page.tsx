import React, {ReactNode, useState, useEffect, useRef} from 'react'
import Taro from '@tarojs/taro'
import {ScrollView, Image, View, Text, Block} from '@tarojs/components-rn'
import useNavTabInfo from '../hooks/useNavTabInfo'
import { Animated, ImageBackground } from "react-native"
import {changeS4} from '../constants/utils'

import './widget.css'


interface PageProps {
  children?: ReactNode
  onScrollToUpper?: Function
  onScrollToLower?: Function
  noScroll?: boolean     //是否可以纵向滚动
  lowerThreshold?: string
  
  bgColor?: string
  /** 图片地址 requie('')  或 {uri: 'httpxx.jpg} */
  bgImage?: any
  padding?: string
  
  type?: 'subpage' | 'tabpage'
  
  noNav?: boolean
  navTitle?: string
  navLogoIcon?: string
  navTitleColor?: string
  navBgColor?: string
  /** 导航栏底部线条颜色 */
  navBorderColor?: string
  noNavBorderBottom?: boolean  //
  navHomePath?: string

  isContentStartUnder?: boolean  // 导航栏是否压在内容上，刚开始的时候
  isAlwaysShowNav?: boolean  //刚开始，是否显示导航栏背景。不显示，则会以下拉动画显示

  /** 当前的主题类型，深色，浅色 */
  theme?: 'dark' | 'light'
  /** 返回首页的图标 */
  IconHome?: ReactNode
  /** 返回上一页的图标 */
  IconBack?: ReactNode
}


const distance = 25

export default (props: PageProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  const {
    children, 
    onScrollToUpper=()=>{},
    onScrollToLower=()=>{},
    noScroll=false,
    lowerThreshold='50',
    
    bgColor='#F2F1F6',
    bgImage='',
    padding='0',

    type='subpage',
    
    noNav=false,
    navTitle='',
    navLogoIcon='',
    navTitleColor='#000000',
    navBgColor='rgba(255,255,255,1)',
    navBorderColor='#dbdbdb',
    noNavBorderBottom=false,
    navHomePath='/pages/index/index',

    isContentStartUnder=false,
    isAlwaysShowNav=false,

    theme='light',
    IconHome,
    IconBack,
  } = props
  const navInfo = useNavTabInfo()
  const [showNav, setShowNav] = useState(false)

  const PageContent = (
    <Block>
      {
        !noNav &&
        <View
          className='_navigation_all'
          style={{
            height: navInfo.appHeaderHeight,
            paddingTop: navInfo.statusBarHeight,
            paddingLeft: navInfo.marginSides,
            paddingRight: navInfo.marginSides,
          }}
        >
          <Animated.View
            style={{
              zIndex: -1,
              position: 'absolute',
              top: 0,
              left: 0,
              height: navInfo.appHeaderHeight,
              width: navInfo.screenWidth,
              opacity: isAlwaysShowNav ? 1 : fadeAnim,
              backgroundColor: navBgColor,
              borderBottomWidth: noNavBorderBottom ? 0 : 1,
              borderBottomColor: noNavBorderBottom ? '' : `${navBorderColor}`,
            }}
          />
          <View
            className='_navigation_title'
            style={{
              width: navInfo.titelBarWidth,
              height: navInfo.titleBarHeight
            }}
          >
            {
              {
                'tabpage': (
                  <View className='_navigation_title_con_center' style={{paddingLeft: navInfo.marginSides}}>
                    <Text className='_navigation_title_st' style={{color: navTitleColor}}>{navTitle}</Text>
                  </View>
                ),
                'subpage': (
                  <View
                    className='_navigation_title_con_back'
                  >
                    <View 
                      style={{width: 50}}
                      className='_navigation_title_con_sub'
                      onClick={() => {
                        Taro.navigateBack()
                      }}
                    >
                      {IconBack}
                    </View>
                    <View className='_navigation_title_con_center_back' style={{width: (navInfo.windowWidth - navInfo.marginSides * 2 - 50 * 2)}}>
                      <Text className='_navigation_title_st' style={{color: navTitleColor}}>{navTitle}</Text>
                    </View>
                    <View style={{width: 50}}>
                    </View>
                  </View>
                ),
              }[type]
            }
          </View>
        </View>
      }

      {
        noScroll ? 
        <Block >
          <View
            style={{
              width: '100%',
              height: 'auto',
              paddingTop: changeS4(padding)[0],
              paddingRight: changeS4(padding)[0],
              paddingBottom: changeS4(padding)[0],
              paddingLeft: changeS4(padding)[0],
            }}
          >
            {(!isContentStartUnder && !noNav) && <View style={{width: '100%', height: navInfo.appHeaderHeight}}/>}
            {children}
          </View>
        </Block>
        :
        <Block>
          <ScrollView
            scrollY
            style={{
              width: '100%',
              height: '100%',
            }}
            lowerThreshold={+lowerThreshold}
            onScrollToUpper={() => {
              onScrollToUpper()
              if(showNav){
                if(theme === 'dark'){
                  fadeOut()
                  setShowNav(false)
                }else{
                  fadeOut()
                  setShowNav(false)
                }
              }
            }}
            onScrollToLower={() => onScrollToLower()}
            onScroll={(e) => {
              if(isAlwaysShowNav) return
              if(e.detail.scrollTop > distance && !showNav){
                if(theme === 'dark'){
                  fadeIn()
                  setShowNav(true)
                }else{
                  fadeIn()
                  setShowNav(true)
                }
              }
              if(e.detail.scrollTop < distance && showNav){
                if(theme === 'dark'){
                  fadeOut()
                  setShowNav(false)
                }else{
                  fadeOut()
                  setShowNav(false)
                }
              }
            }}
          >
            <View
              style={{
                width: '100%',
                height: 'auto',
                paddingTop: changeS4(padding)[0],
                paddingRight: changeS4(padding)[0],
                paddingBottom: changeS4(padding)[0],
                paddingLeft: changeS4(padding)[0],
              }}
            >
              {(!isContentStartUnder && !noNav) && <View style={{width: '100%', height: navInfo.appHeaderHeight}}/>}
              {children}
            </View>
          </ScrollView>
        </Block>
      }
    </Block>
  )

  return(
    <Block>
      {
        bgImage ? 
        <ImageBackground 
          source={bgImage} 
          resizeMode='cover'
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            backgroundColor: bgColor,
            overflow: 'hidden',
          }}
        >
          {PageContent}
        </ImageBackground>
        :
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            backgroundColor: bgColor,
            overflow: 'hidden',
          }}
        >
          {PageContent}
        </View>
      }
    </Block>
  )
}