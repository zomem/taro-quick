import React, {ReactNode, useEffect, useRef, useState} from 'react'
import Taro from '@tarojs/taro'
import {View, Swiper, SwiperItem} from '@tarojs/components'
import {TabPaneProps} from './TabPane'

import {Block, Box, Flex, Line, ScrollView, TaroQuickAnimate} from '../Components'
import { ZPX } from '../../constants/constants'

import '../widget.css'

const rtx = 750 / Taro.getSystemInfoSync().windowWidth

export interface TabsProps {
  children: React.ReactNode
  /** 当前tabs的尺寸，`宽 高` 宽可设置为 100%，高必须为具体数值 */
  size?: string
  /** 当前选中的 */
  current?: number
  onChange?: Function
  /** 不显示 tab 栏 */
  hideTab?: boolean
  /** 每一个 tab 的宽度, 不包含 rightItem 的宽度。
   * 
   */
  tabWidth: string
  /** 每个 tab 的默认字体颜色 */
  tabFontColor?: string,
  /** tab 栏的颜色 */
  tabBgColor?: string
  /** tab 栏的下边线颜色 */
  tabLineColor?: string
  /** 选择中的颜色 */
  selectColor?: string
  /** 选中的字体粗细 */
  selectFontWeight?: string
  /** 选中的 下划线 size 只能传 数字形式 */
  selectLineSize?: string
  /** 选中的 下划线 radius */
  selectLineRadius?: string,
  /** 选中的 line 的颜色 */
  selectLineColor?: string,
  /** 内容背景色 */
  contentBgColor?: string
  /** 内容 padding */
  contentPadding?: string
  /** tab栏，是否可滑动，当内容显示不完时，可设置 */
  isTabScroll?: boolean
  /** 内容是否支持滚动 */
  isContentScroll?: boolean
  /** 当内容可滚动时，触发的滚动到页面底部事件 */
  onScrollToLower?: (event: any) => void
  /** 当内容可滚动时，触发滚动到页面顶部事件 */
  onScrollToUpper?: (event: any) => void
  /** tab 容器的 圆角度 */
  radius?: string,

  /** tab栏，右侧组件，可以加筛选之类的。 */
  rightItem?: ReactNode,

  /** 距底部/右边多远时，触发 scrolltolower 事件 */
  lowerThreshold?: string
}

let animate = Taro.createAnimation({
  transformOrigin: "50% 50%",
  duration: 300,
  timingFunction: "ease",
  delay: 0
})

const InnerTabs = ({
  children, current=0, onChange=() => {}, tabWidth='',  radius='0',
  selectColor='#1890ff', selectLineColor="#1890ff", isTabScroll=false, isContentScroll=false, 
  size='100% 300', tabBgColor='rgba(255, 255 ,255 ,0.89)', contentBgColor='#ffffff',
  onScrollToLower=()=>{}, contentPadding='0', tabLineColor='#f2f2f2',
  onScrollToUpper=()=>{}, hideTab=false, selectFontWeight="normal",
   selectLineRadius="0", selectLineSize="80 2", tabFontColor="#222229", rightItem, lowerThreshold
}: TabsProps) => {

  const titleList = useRef<TabPaneProps[]>([])

  const [animateData, setAnimateData] = useState<TaroQuickAnimate>({actions: []})



  useEffect(() => {
    titleList.current = []
    React.Children.forEach(children, (child, index) => {
      if(!React.isValidElement(child)) return null
      let o: TabPaneProps = {tab: '', index: 0, currentIndex: 0}
      if(child.props?.tab){
        o.tab = child.props?.tab
        o.index = index
        o.currentIndex = current
      }
      titleList.current.push(o)
    })
  }, [children])

  useEffect(() => {
    animate.left(((+tabWidth) * current) / rtx).step()
    setAnimateData(animate.export())
  }, [current, tabWidth])



  return (
    <Box size={size} position='relative' radius={radius} overflow='hidden' zIndex='1'>
      {
        !hideTab &&
        <Box size='100% 86' zIndex='10' position='absolute' top='0' left='0' bgColor={tabBgColor} backdrop='20'>
          {
            isTabScroll ?
            <Block>
              {
                rightItem ?
                <Flex flex="frbc" size={`100% 86`}>
                  <ScrollView scrollX scrollLeft={tabWidth ? `${((current - 1) * (+tabWidth)) / rtx}` : undefined} size={`${750 - (+tabWidth)} 86`} scrollWithAnimation >
                    <View style={{height: '100%', whiteSpace: 'nowrap'}} >
                      <View 
                        className='_topCatLine_scroll_bar'
                        style={{
                          width: (+tabWidth) / rtx + 'PX',
                        }}
                        animation={animateData}
                      >
                        <View 
                          style={{
                            backgroundColor: selectLineColor,
                            borderRadius: +selectLineRadius / rtx + 'PX',
                            left: selectLineSize ? `${(1 - (+selectLineSize.split(' ')[0] / +tabWidth)) * 100 / 2}%` : "20%",
                            width: selectLineSize ? (selectLineSize.split(' ')[0].includes('auto') ? 'auto' : selectLineSize.split(' ')[0].includes('%') ? selectLineSize.split(' ')[0] : selectLineSize.split(' ')[0] + ZPX) : "60%",
                            height: selectLineSize ? (selectLineSize.split(' ')[1].includes('auto') ? 'auto' : selectLineSize.split(' ')[1].includes('%') ? selectLineSize.split(' ')[1] : selectLineSize.split(' ')[1] + ZPX) : '5' + ZPX,
                          }} 
                          className='_topCatLine_scroll_bar_color'
                        />
                      </View>
                      {
                        titleList.current.map((item, index) => (
                          <View className='_topCatLine_item_scroll' key={index}>
                            <View 
                              className='_topCatLine_item'
                              style={{
                                width: (+tabWidth) / rtx + 'PX',
                                color: current === index ? selectColor : tabFontColor,
                                fontWeight: current === index ? selectFontWeight : 'normal',
                              }}
                              onClick={() => {
                                if(current === index) return
                                onChange(index)
                              }}
                            >
                              {item.tab}
                            </View>
                          </View>
                        ))
                      }
                    </View>
                  </ScrollView>
                  <View className='_topCatLine_screen' style={{backgroundColor: tabBgColor}}>
                    {rightItem}
                  </View>
                </Flex>
                :
                <ScrollView scrollX scrollLeft={tabWidth ? `${((current - 1) * (+tabWidth)) / rtx}` : undefined} size='100% 86' scrollWithAnimation >
                  <View style={{height: '100%', whiteSpace: 'nowrap'}} >
                    <View 
                      className='_topCatLine_scroll_bar'
                      style={{
                        width: (+tabWidth) / rtx + 'PX',
                      }}
                      animation={animateData}
                    >
                      <View 
                        style={{
                          backgroundColor: selectLineColor,
                          borderRadius: +selectLineRadius / rtx + 'PX',
                          left: selectLineSize ? `${(1 - (+selectLineSize.split(' ')[0] / +tabWidth)) * 100 / 2}%` : "20%",
                          width: selectLineSize ? (selectLineSize.split(' ')[0].includes('auto') ? 'auto' : selectLineSize.split(' ')[0].includes('%') ? selectLineSize.split(' ')[0] : selectLineSize.split(' ')[0] + ZPX) : "60%",
                          height: selectLineSize ? (selectLineSize.split(' ')[1].includes('auto') ? 'auto' : selectLineSize.split(' ')[1].includes('%') ? selectLineSize.split(' ')[1] : selectLineSize.split(' ')[1] + ZPX) : '5' + ZPX,
                        }} 
                        className='_topCatLine_scroll_bar_color'
                      />
                    </View>
                    {
                      titleList.current.map((item, index) => (
                        <View className='_topCatLine_item_scroll' key={index}>
                          <View 
                            className='_topCatLine_item'
                            style={{
                              width: (+tabWidth) / rtx + 'PX',
                              color: current === index ? selectColor : tabFontColor,
                              fontWeight: current === index ? selectFontWeight : 'normal',
                            }}
                            onClick={() => {
                              if(current === index) return
                              onChange(index)
                            }}
                          >
                            {item.tab}
                          </View>
                        </View>
                      ))
                    }
                  </View>
                </ScrollView>
              }
            </Block>
            :
            <View 
              className='_topCatLine_all'
              style={{backgroundColor: ''}}
            >
              <View 
                className='_topCatLine_scroll_bar'
                style={{
                  width: (+tabWidth) / rtx + 'PX',
                }}
                animation={animateData}
              >
                <View 
                  style={{
                    backgroundColor: selectLineColor,
                    borderRadius: +selectLineRadius / rtx + 'PX',
                    left: selectLineSize ? `${(1 - (+selectLineSize.split(' ')[0] / +tabWidth)) * 100 / 2}%` : "20%",
                    width: selectLineSize ? (selectLineSize.split(' ')[0].includes('auto') ? 'auto' : selectLineSize.split(' ')[0].includes('%') ? selectLineSize.split(' ')[0] : selectLineSize.split(' ')[0] + ZPX) : "60%",
                    height: selectLineSize ? (selectLineSize.split(' ')[1].includes('auto') ? 'auto' : selectLineSize.split(' ')[1].includes('%') ? selectLineSize.split(' ')[1] : selectLineSize.split(' ')[1] + ZPX) : '5' + ZPX,
                  }} 
                  className='_topCatLine_scroll_bar_color'
                />
              </View>
              {
                titleList.current.map((item, index) => (
                  <View 
                    className='_topCatLine_item'
                    key={index}
                    style={{
                      width: (+tabWidth) / rtx + 'PX',
                      color: current === index ? selectColor : tabFontColor,
                      fontWeight: current === index ? selectFontWeight : 'normal',
                    }}
                    onClick={() => {
                      if(current === index) return
                      onChange(index)
                    }}
                  >
                    {item.tab}
                  </View>
                ))
              }
              {rightItem && rightItem}
            </View>
          }
          <Line size='100% 1' bgColor={tabLineColor} />
        </Box>
      }
      <Swiper 
        current={current}
        className='_topCatLine_Swiper'
        style={{
          height: `${size.split(' ')[1]}${ZPX}`,
          backgroundColor: contentBgColor
        }}
        onChange={(e) => {
          onChange(e.detail.current)
        }}
      >
        {
          React.Children.map(children, (child) => {
            if(React.isValidElement(child)){
              return (
                <SwiperItem>
                  {React.cloneElement(child, {
                      isContentScroll, 
                      contentHeight: size.split(' ')[1],
                      onScrollToLower,
                      contentPadding,
                      onScrollToUpper,
                      hideTab,
                      lowerThreshold,
                    })
                  }
                </SwiperItem>
              )
            }
            throw new Error('Tabs.TabPane 不是 React.ReactElement 类型')
          })
        }
      </Swiper>
    </Box>
  )
}

export default InnerTabs