/*
 * @Author: zomem 770552117@qq.com
 * @Date: 2022-06-03 14:03:34
 * @LastEditors: zomem 770552117@qq.com
 * @LastEditTime: 2022-06-04 15:28:45
 * @FilePath: /taro-quick/rn/hooks/useNavTabInfo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'
import {Dimensions} from 'react-native';


interface INavInfo {
  statusBarHeight: number
  optionsBarHeight: number
  titleBarHeight: number
  titelBarWidth: number
  tabBarHeight: number
  appHeaderHeight: number
  marginSides: number
  capsuleWidth: number
  capsuleHeight:number
  capsuleLeft: number
  screenHeight: number
  screenWidth: number
  windowHeight: number
  windowWidth: number
  top: number
  RTX: number
}

function useNavTabInfo(): INavInfo {
  const [navInfo, setNavInfo] = useState({
    statusBarHeight: 0,
    optionsBarHeight: 0,
    titleBarHeight: 0,
    titelBarWidth: 0,
    tabBarHeight: 0,
    appHeaderHeight: 0,
    marginSides: 0,
    capsuleWidth: 0,
    capsuleHeight: 0,
    capsuleLeft: 0,
    screenHeight: 0,
    screenWidth: 0,
    windowHeight: 0,
    windowWidth: 0,
    top: 0,
    RTX: 1,
  })

  useEffect(() => {

    const {height} = Dimensions.get('window')
    const { statusBarHeight=24, safeArea={}, screenWidth, screenHeight, platform, windowWidth } = Taro.getSystemInfoSync()
    
    
    // 计算标题栏高度
    let titleBarHeight = 48
    let tabBarHeight = 48
    
    // 计算导航栏高度
    let appHeaderHeight = statusBarHeight + titleBarHeight //
    
    //边距，两边的
    let marginSides = 10
    //标题宽度
    let titelBarWidth = screenWidth - marginSides * 2
    //去掉导航栏，屏幕剩余的高度

    setNavInfo({
      statusBarHeight: statusBarHeight, //状态栏高度
      optionsBarHeight: height - (safeArea.bottom || 0), // 底部操作控件高度
      titleBarHeight: titleBarHeight,  //标题栏高度
      titelBarWidth: titelBarWidth,  //标题栏宽度
      tabBarHeight: tabBarHeight,
      appHeaderHeight: appHeaderHeight, //整个导航栏高度
      marginSides: marginSides, //侧边距
      capsuleWidth: 0, //胶囊宽度
      capsuleHeight: 0, //胶囊高度
      capsuleLeft: 0,
      screenHeight: screenHeight,
      screenWidth: screenWidth,
      windowHeight: height, // 
      windowWidth: windowWidth,
      top: 0,
      RTX: 750 / windowWidth
    })
  }, [])
  return navInfo
}


export default useNavTabInfo