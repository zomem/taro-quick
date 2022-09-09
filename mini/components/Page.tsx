import {ReactNode, useState, useEffect, FC} from 'react'
import Taro from '@tarojs/taro'
import {ScrollView, Image, View, Text, Block} from '@tarojs/components'
import useNavTabInfo from '../hooks/useNavTabInfo'
import {ZPX} from '../constants/constants'
import {TaroQuickAnimate} from './Components'

import './widget.css'


interface Page {
  children?: ReactNode
  /** 滑动到顶部的事件，noScroll=false 时有效 */
  onScrollToUpper?: Function
  /** 滑动到底部的事件，noScroll=false 时有效 */
  onScrollToLower?: Function
  /** 
   * 页面是否可滑动，默认是可滑动的 
   * @default false
   */
  noScroll?: boolean     //是否可以纵向滚动
  enhanced?: boolean
  bounces?: boolean
  lowerThreshold?: string
  
  bgColor?: string
  bgImage?: string
  padding?: string
  
  /**
   * 页面类型，logopage: 顶部栏可显示logo的类型，需要传入 navLogoIcon 图片，
   * subpage: 子页面类型，即左上角会显示返回按钮。需要传入 IconHome 和 IconBack 组件
   * tabpage: tabbar 页面。
   */
  type?: 'logopage' | 'subpage' | 'tabpage'
  
  /** 导航栏标题 */
  navTitle?: string
  navTitleFontWeight?: string
  navLogoIcon?: string
  /** 导航栏标题颜色 */
  navTitleColor?: string
  /** 导航栏背景颜色 */
  navBgColor?: string
  /** 导航栏底部线条颜色 */
  navBorderColor?: string
  /** 是否显示底部 border */
  noNavBorderBottom?: boolean  //
  isNavBlur?: boolean  // 是否开启毛玻璃
  /** 首页路径 */
  navHomePath?: string

  /** 导航栏是否压在内容上，刚开始的时候 */
  isContentStartUnder?: boolean
  /** 刚开始，是否始终显示导航栏背景。不显示，则会以下拉动画显示 */
  isAlwaysShowNav?: boolean

  /** 当前的主题类型，深色，浅色 */
  theme?: 'dark' | 'light'
  /** 返回首页的图标 */
  IconHome?: ReactNode
  /** 返回上一页的图标 */
  IconBack?: ReactNode
}

var animation = Taro.createAnimation({
  transformOrigin: "50% 50%",
  duration: 150,
  timingFunction: "linear",
  delay: 0
})

const distance = 25

const Page = (props: Page) => {

  const {
    children, 
    onScrollToUpper=()=>{},
    onScrollToLower=()=>{},
    noScroll=false, 
    enhanced=false, 
    bounces=true,
    lowerThreshold='50',
    
    bgColor='#F2F1F6',
    bgImage='none',
    padding='0',

    type='subpage',
    
    navTitle='',
    navTitleFontWeight="bold",
    navLogoIcon='',
    navTitleColor='#000000',
    navBgColor='rgba(255,255,255,0.89)',
    navBorderColor='#dbdbdb',
    noNavBorderBottom=false,
    isNavBlur=true,
    navHomePath='/pages/home/Home',

    isContentStartUnder=false,
    isAlwaysShowNav=false,

    theme='light',
    IconHome,
    IconBack,
  } = props
  const navInfo = useNavTabInfo()
  const [navBgAnimate, setNavBgAnimate] = useState<TaroQuickAnimate>({actions: []})
  const [showNav, setShowNav] = useState(false)

  const [navTo, setNavTo] = useState(0)

  useEffect(() => {
    let l = Taro.getCurrentPages().length
    if(l > 1){
      setNavTo(2)
    }else{
      setNavTo(1)
    }
  }, [])

  return(
    <Block>
      <View
        className='_navigation_all'
        style={{
          height: navInfo.appHeaderHeight + 'px',
          paddingTop: navInfo.statusBarHeight + 'px',
          paddingLeft: navInfo.marginSides + 'px',
          paddingBottom: navInfo.top - navInfo.statusBarHeight + 'px',
        }}
      >
        <View 
          className={isNavBlur ? '_navigation_blur _navigation_content' : '_navigation_content'}
          style={{
            height: navInfo.appHeaderHeight + 'px',
            opacity: isAlwaysShowNav ? '1' : '0',
            backgroundColor: navBgColor,
            borderBottom: noNavBorderBottom ? 'none' : `1rpx solid ${navBorderColor}`
          }}
          animation={navBgAnimate}
        />
        <View
          className='_navigation_title'
          style={{
            width: navInfo.titelBarWidth + 'px',
            height: navInfo.titleBarHeight + 'px'
          }}
        >
          {
            {
              'logopage': (
                <View className='_navigation_title_con'>
                  <Image
                    style={{
                      width: navInfo.capsuleHeight - 5 + 'px',
                      height: navInfo.capsuleHeight - 5 + 'px',
                    }} 
                    className='_navigation_logo'
                    src={navLogoIcon} 
                  />
                  <Text className='_navigation_title_st' style={{color: navTitleColor, fontWeight: navTitleFontWeight}}>{navTitle}</Text>
                </View>
              ),
              'tabpage': (
                <View className='_navigation_title_con_center' style={{paddingLeft: navInfo.capsuleWidth + navInfo.marginSides + 'px'}}>
                  <Text className='_navigation_title_st' style={{color: navTitleColor, fontWeight: navTitleFontWeight}}>{navTitle}</Text>
                </View>
              ),
              'subpage': (
                <View className='_navigation_title_con'>
                  <View 
                    style={{width: navInfo.capsuleWidth + 'px'}}
                    className='_navigation_title_con_back'
                    onClick={() => {
                      if(navTo <= 1){
                        Taro.switchTab({
                          url: navHomePath
                        })
                      }else{
                        Taro.navigateBack()
                      }
                    }}
                  >
                    {
                      navTo <= 1 ?
                      IconHome
                      :
                      IconBack
                    }
                  </View>
                  <View className='_navigation_title_con_center_back' style={{width: (navInfo.windowWidth - (navInfo.capsuleWidth * 2 + navInfo.marginSides * 4) + 'px')}}>
                    <Text className='_navigation_title_st' style={{color: navTitleColor, fontWeight: navTitleFontWeight}}>{navTitle}</Text>
                  </View>
                </View>
              ),
            }[type]
          }
        </View>
      </View>

      {
        noScroll ? 
        <View
          style={{
            height: navInfo.windowHeight + 'px',
            width: '750' + ZPX,
            position: 'relative',
            backgroundColor: bgColor,
            backgroundImage: bgImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment:'fixed',
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              padding: padding.replace(/\s/g, ZPX + ' ') + ZPX || '0' + ZPX
            }}
          >
            {!isContentStartUnder && <View style={{width: '100%', height: navInfo.appHeaderHeight + 'px'}}/>}
            {children}
          </View>
        </View>
        :
        <ScrollView
          scrollY
          style={{
            height: navInfo.windowHeight + 'px',
            backgroundColor: bgColor,
            backgroundImage: bgImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment:'fixed',
          }}
          enhanced={enhanced}
          bounces={bounces}
          lowerThreshold={+lowerThreshold}
          onScrollToUpper={() => {
            onScrollToUpper()
            if(showNav){
              if(theme === 'dark'){
                animation.opacity(0).step()
                setNavBgAnimate(animation.export())
                setShowNav(false)
              }else{
                animation.opacity(0).step()
                setNavBgAnimate(animation.export())
                setShowNav(false)
              }
            }
          }}
          onScrollToLower={() => onScrollToLower()}
          onScroll={(e) => {
            if(isAlwaysShowNav) return
            if(e.detail.scrollTop > distance && !showNav){
              if(theme === 'dark'){
                animation.opacity(1).step()
                setNavBgAnimate(animation.export())
                setShowNav(true)
              }else{
                animation.opacity(1).step()
                setNavBgAnimate(animation.export())
                setShowNav(true)
              }
            }
            if(e.detail.scrollTop < distance && showNav){
              if(theme === 'dark'){
                animation.opacity(0).step()
                setNavBgAnimate(animation.export())
                setShowNav(false)
              }else{
                animation.opacity(0).step()
                setNavBgAnimate(animation.export())
                setShowNav(false)
              }
            }
          }}
        >
          <View
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: padding.replace(/\s/g, ZPX + ' ') + ZPX || '0' + ZPX
            }}
          >
            {!isContentStartUnder && <View style={{width: '100%', height: navInfo.appHeaderHeight + 'px'}}/>}
            {children}
          </View>
        </ScrollView>
      }
    </Block>
  )
}


export default Page