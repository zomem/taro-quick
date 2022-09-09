import React, {useEffect, useState} from 'react'
import Taro from '@tarojs/taro'
import {View, Swiper, SwiperItem} from '@tarojs/components-rn'
import {TabPaneProps} from './TabPane'

import {Box, Line, ScrollView, Text} from '../Components'

import '../widget.css'
import { RTX } from '../../constants/constants'

// const rtx = 750 / Taro.getSystemInfoSync().windowWidth

export interface TabsProps {
  children: React.ReactNode
  /** 当前tabs的尺寸，`宽 高` 宽可设置为 100%，高必须为具体数值 */
  size?: string
  /** 当前选中的 */
  current?: number
  onChange?: (value: number | string) => void
  /** 不显示 tab 栏 */
  hideTab?: boolean
  /** 每一个 tab 的宽度 */
  tabWidth?: string
  /** tab 栏的颜色 */
  tabBgColor?: string
  /** tab 栏的下边线颜色 */
  tabLineColor?: string
  /** tab 栏的高度 */
  tabHeight?: string
  /** 选中的，距离左边预留tab个数。默认为 '1'. tab为滑动时有效 */
  selectTabPosition?: string
  /** 选择中的颜色 */
  selectColor?: string
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
  radius?: string

  fontSize?: string
}



const InnerTabs = ({
  children, current=0, onChange=(e) => {}, tabWidth='', 
  selectColor='#1890ff', isTabScroll=false, isContentScroll=false, 
  size='100% 300', tabBgColor='rgba(255, 255 ,255 ,0.89)', contentBgColor='#ffffff',
  onScrollToLower=()=>{}, contentPadding='0', tabLineColor='#f2f2f2', fontSize='32',
  onScrollToUpper=()=>{}, tabHeight='86', selectTabPosition='1', hideTab=false, radius='15'
}: TabsProps) => {

  const [titleList, setTitleList] = useState<TabPaneProps[]>([])

  useEffect(() => {
    let tempTitleList: TabPaneProps[] = []
    React.Children.forEach(children, (child, index) => {
      if(!React.isValidElement(child)) return null
      let o: TabPaneProps = {tab: '', index: 0, currentIndex: 0}
      if(child.props?.tab){
        o.tab = child.props?.tab
        o.index = index
        o.currentIndex = current
      }
      tempTitleList.push(o)
    })
    setTitleList(tempTitleList)
  }, [children])


  return (
    <Box size={size} position='relative' radius={radius} overflow='hidden' zIndex='1'>
      {
        !hideTab &&
        <Box size={`100% ${tabHeight}`} zIndex='10' position='absolute' top='0' left='0' bgColor={tabBgColor} >
          {
            isTabScroll ?
            <ScrollView 
              scrollX 
              scrollLeft={tabWidth ? `${((current - +selectTabPosition) * (+tabWidth * RTX))}` : undefined}
              showsHorizontalScrollIndicator={false}
              size={`100% ${tabHeight}`}
            >
              <View 
                style={{
                  height: '100%',
                  width: +tabWidth * RTX * titleList.length,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }} 
              >
                {
                  titleList.map((item, index) => (
                    <View 
                      key={index}
                      className='_topCatLine_item'
                      style={{
                        width: +tabWidth * RTX,
                        height: +tabHeight * RTX,
                      }}
                      onClick={() => {
                        if(current === index) return
                        onChange(index)
                      }}
                    >
                      <Text fontSize={fontSize} color={current === index ? selectColor : '#8a8a8a'}>{item.tab}</Text>
                      {
                        current === index &&
                        <View style={{backgroundColor: selectColor, height: 4 * RTX}} className='_topCatLine_scroll_bar_color'></View>
                      }
                    </View>
                  ))
                }
              </View>
            </ScrollView>
            :
            <View 
              className='_topCatLine_all'
              style={{height: +(tabHeight) * RTX}}
            >
              {
                titleList.map((item, index) => (
                  <View 
                    key={index}
                    className='_topCatLine_item'
                    style={{
                      width: +tabWidth * RTX,
                      height: +(tabHeight) * RTX,
                    }}
                    onClick={() => {
                      if(current === index) return
                      onChange(index)
                    }}
                  >
                    <Text fontSize={fontSize} color={current === index ? selectColor : '#8a8a8a'}>{item.tab}</Text>
                    {
                      current === index &&
                      <View style={{backgroundColor: selectColor, height: 4 * RTX}} className='_topCatLine_scroll_bar_color'></View>
                    }
                  </View>
                ))
              }
            </View>
          }
          <Line size='100% 1' bgColor={tabLineColor} />
        </Box>
      }
      <Swiper 
        current={current}
        style={{
          width: '100%',
          height: +size.split(' ')[1] * RTX,
          backgroundColor: contentBgColor
        }}
        onChange={(e) => {
          onChange(e.detail.current)
        }}
      >
        {
          React.Children.map(children, (child, index) => {
            if(React.isValidElement(child)){
              return (
                <SwiperItem key={index} >
                  {React.cloneElement(child, {
                      isContentScroll, 
                      contentHeight: size.split(' ')[1],
                      onScrollToLower,
                      contentPadding,
                      onScrollToUpper,
                      tabHeight,
                      hideTab,
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