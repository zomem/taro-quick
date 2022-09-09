import React, { ReactNode, useState, ElementType } from 'react'
import Taro from '@tarojs/taro'
import {
  Image as Img, 
  View as Viw, 
  Block as Blk,
  Input as Int,
  Textarea as Tarea,
  Swiper as Swi,
  SwiperItem as SwiI,
  Button as Btn,
  Switch as Sch,
  ScrollView as ScV,
} from '@tarojs/components'
import {styled} from '@linaria/react'
import {ZPX} from '../constants/constants'
import './widget.css'
const sys = Taro.getSystemInfoSync()

export type TFontSize = string


export type TFontWeight = 'normal' | 'bold' | '900' | '800' | '700' | '600' |
                '500' | '400' | '300' | '200' | '100' | 'bolder' | 'lighter' | 'initial' | 'inherit'
export type TFontSpacing = string
export type TOverflow = 'visible' | 'hidden' | 'scroll' | 'auto' | 'inherit' |
                'visible visible' | 'visible hidden' | 'visible scroll' | 'visible auto' | 'visible inherit' |
                'hidden visible' | 'hidden hidden' | 'hidden scroll' | 'hidden auto' | 'hidden inherit' |
                'scroll visible' | 'scroll hidden' | 'scroll scroll' | 'scroll auto' | 'scroll inherit' |
                'auto visible' | 'auto hidden' | 'auto scroll' | 'auto auto' | 'auto inherit' |
                'inherit visible' | 'inherit hidden' | 'inherit scroll' | 'inherit auto' | 'inherit inherit'
export type TDisplay = 'flex' | 'inline' | 'block' | 'inline-block' | 'none'
export type TFlexWay = 'fraa' | 'frab' | 'frac' | 'frae' | 'fras' |
                'frba' | 'frbb' | 'frbc' | 'frbe' | 'frbs' |
                'frca' | 'frcb' | 'frcc' | 'frce' | 'frcs' |
                'frea' | 'freb' | 'frec' | 'free' | 'fres' |
                'frsa' | 'frsb' | 'frsc' | 'frse' | 'frss' |
                'fcaa' | 'fcab' | 'fcac' | 'fcae' | 'fcas' |
                'fcba' | 'fcbb' | 'fcbc' | 'fcbe' | 'fcbs' |
                'fcca' | 'fccb' | 'fccc' | 'fcce' | 'fccs' |
                'fcea' | 'fceb' | 'fcec' | 'fcee' | 'fces' |
                'fcsa' | 'fcsb' | 'fcsc' | 'fcse' | 'fcss'
export type TBoxSizing = 'content-box' | 'border-box'
export type TPosition = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky' | 'inherit'
export type TBgImageType = 'aspectFit' | 'aspectFill'
export type TSafeType = 'top' | 'bottom'
export type TTextDecoration = 'underline' | 'none' | 'line-through'
export type TFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse' | 'inherit' | 'initial' | 'unset'
export type TFontStyle = 'normal' | 'italic' | 'oblique' | 'inherit'
export type TWhiteSpace = 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces'
export type TPointerEvents = 'auto' | 'none'
export type TStroke = string
export type TLeft = string
export type TRight = string
export type TTop = string
export type TBottom = string
export type TPadding = string
export type TMargin = string
export type TSize = string
export type TRadius = string
export type TColor = string
export type TZIndex = string
export type TOpacity = string
export type TBackDrop = string
export type TMinHeight = string
export type TMaxHeight = string
export type THoverBgColor = string
export type TWordBreak = 'break-all' | 'normal' | 'keep-all' | 'break-word'
export type TFlexShrink = '0' | '1' | 'inherit' | 'initial'
export type TBgGradient = string[]
export type TTextAlign = 'left' | 'right' | 'center'
export type TJustifyContent = 'center' | 'space-between' | 'space-around' | 'flex-end' | 'flex-start'
export type TBorderWidth = string
export type TBorderStyle = "dotted" | "dashed" | "solid" | 
                            "double" | "groove" | "ridge" | "inset" |
                            "outset" | "none" | "hidden"


export interface TaroQuickAnimate {
  actions: any[]
}



// 块
export interface BlockProps{
  children?: ReactNode
}
export const Block = (props: BlockProps) => (
  <Blk>{props.children}</Blk>
)






interface BoxBase {
  /**
   * 盒子宽度和高度，如：‘50 50’，先写宽度，后写高度，中间用空格隔开。宽高必须同时写上，支持数字、%、auto
   * @default 'auto auto'
   */
  size?: TSize
  /**
   * 盒子圆角，如果四个角都要设置圆角，则写成 ‘15’。如果分别设置，则为 ‘12 2 12 2’，左上 右上 右下 左下
   * 只能传数值，不能传百分比
   */
  radius?: TRadius
  overflow?: TOverflow
  /**
   * @default 'border-box'
   */
  boxSizing?: TBoxSizing
  /** 盒子背景色 */
  bgColor?: TColor
  /** 盒子背景填充图片 */
  bgImage?: TColor
  /** 背景图片适应类型，和 image 的 mode 类似 */
  bgImageType?: TBgImageType
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  /** 边框阴影颜色。有值，则显示边框阴影。无值，则没边框阴影。 */
  shadowColor?: TColor
  /** 边框的颜色，目前不支持单边设置，但你可以用 Line 组件实现 */
  borderColor?: TColor
  /** 边框宽度，默认为 '1'，且只有当 borderColor 有值时，宽度才生效。目前不支持单边设置，但你可以用 Line 组件实现 */
  borderWidth?: TBorderWidth
  /** 边框样式，，默认 solid */
  borderStyle?: TBorderStyle,
  zIndex?: TZIndex
  opacity?: TOpacity
  /** 
   * 毛玻璃效果的效果值，一般设置为 20。
   */
  backdrop?: TBackDrop
  minHeight?: TMinHeight
  maxHeight?: TMaxHeight
  /** 盒子是否有点击事件，默认为有的 */
  pointerEvents?: TPointerEvents
  onClick?: Function
  /** Flex 布局时，如果被压缩，可以设置为 0 ,防止变形压缩 */
  flexShrink?: TFlexShrink
  /** 渐变色，即 linear-gradient(23deg, red, blue) => bgGradient={[23deg, red, blue]} */
  bgGradient?: TBgGradient
}
export interface BoxProps extends BoxBase{
  /**
   * 盒子类型，如果想实现自动换行，此值可设置为 ‘flex’，同时 flexWrap 设置为 'wrap'
   */
  display?: TDisplay
  /** 布局 padding 形式为： ‘10’ ‘12 4’ ‘12 4 2 5’ */
  padding?: TPadding
  /** 布局 margin 形式为： ‘10’ ‘12 4’ ‘12 4 2 5’ */
  margin?: TMargin
  flexWrap?: TFlexWrap
  justifyContent?: TJustifyContent
  whiteSpace?: TWhiteSpace

  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  letterSpacing?: TFontSpacing
  lineHeight?: string
  textDecoration?: TTextDecoration
  stroke?: TStroke
  fontStyle?: TFontStyle
  wordBreak?: TWordBreak
}
export const Box = styled.view<BoxProps>`
  width: ${props => (props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : 'auto')};
  height: ${props => (props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : 'auto')};
  box-sizing: ${props => props.boxSizing ? props.boxSizing : 'border-box'};
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border: ${props => props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none'};
  overflow: ${props => props.overflow || 'visible'};
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0)'};
  background-image: ${props => props.bgImage ? props.bgImage : props.bgGradient ? 'linear-gradient(' + props.bgGradient.toString() + ')' : 'none'};
  backdrop-filter: ${props => props.backdrop ? `blur(${props.backdrop}px)` : 'none'};
  pointer-events: ${props => props.pointerEvents || 'auto'};
  white-space: ${props => props.whiteSpace || 'normal'};
  min-height: ${props => props.minHeight ? props.minHeight + ZPX : 'none'};
  max-height: ${props => props.maxHeight ? props.maxHeight + ZPX : 'none'};
  background-size: ${props => props.bgImageType === 'aspectFit' ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center;
  display: ${props => props.display || 'block'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  box-shadow: ${props => props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none'};
  position: ${props => props.position || 'static'};
  left: ${props => props.left ? props.left + ZPX : 'auto'};
  top: ${props => props.top ? props.top + ZPX : 'auto'};
  right: ${props => props.right ? props.right + ZPX : 'auto'};
  bottom: ${props => props.bottom ? props.bottom + ZPX : 'auto'};
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  font-size: ${props => (props.fontSize || '32') + ZPX};
  color: ${props => props.color || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  word-break: ${props => props.wordBreak ? props.wordBreak : 'normal'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
  flex-shrink: ${props => props.flexShrink || 'initial'};
` as ElementType<BoxProps>


export interface SafeAreaProps extends BoxBase{
  /** 安全盒子类型，top 为顶部自适应安全距离。 bottom 为底部自适应安全距离 */
  safe: TSafeType
  display?: TDisplay
  flexWrap?: TFlexWrap
  justifyContent?: TJustifyContent
  whiteSpace?: TWhiteSpace
}
export const SafeArea = styled.view<SafeAreaProps>`
  width: ${props => (props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : 'auto')};
  height: ${props => (props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : 'auto')};
  box-sizing: content-box;
  padding-top: ${props => (props.safe === 'top' ? sys.statusBarHeight + 'PX' : '0')};
  padding-bottom: ${props => (props.safe === 'bottom' ? 'env(safe-area-inset-bottom)': '0')};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border: ${props => props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none'};
  overflow: ${props => props.overflow || 'visible'};
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0)'};
  background-image: ${props => props.bgImage ? props.bgImage : props.bgGradient ? 'linear-gradient(' + props.bgGradient.toString() + ')' : 'none'};
  backdrop-filter: ${props => props.backdrop ? `blur(${props.backdrop}px)` : 'none'};
  pointer-events: ${props => props.pointerEvents || 'auto'};
  white-space: ${props => props.whiteSpace || 'normal'};
  min-height: ${props => props.minHeight ? props.minHeight + ZPX : 'none'};
  max-height: ${props => props.maxHeight ? props.maxHeight + ZPX : 'none'};
  background-size: ${props => props.bgImageType === 'aspectFit' ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center;
  display: ${props => props.display || 'block'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  box-shadow: ${props => props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none'};
  position: ${props => props.position || 'static'};
  left: ${props => props.left ? props.left + ZPX : 'auto'};
  top: ${props => props.top ? props.top + ZPX : 'auto'};
  right: ${props => props.right ? props.right + ZPX : 'auto'};
  bottom: ${props => props.bottom ? props.bottom + ZPX : 'auto'};
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  flex-shrink: ${props => props.flexShrink || 'initial'};
` as ElementType<SafeAreaProps>

export interface FlexProps extends BoxBase{
  /** flex 布局类型，如：‘frbc’ 参数为每个样式的关键字母提取。 */
  flex: TFlexWay
  /** 布局 padding 形式为： ‘10’ ‘12 4’ ‘12 4 2 5’ */
  padding?: TPadding
  /** 布局 margin 形式为： ‘10’ ‘12 4’ ‘12 4 2 5’ */
  margin?: TMargin
  
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  letterSpacing?: TFontSpacing
  lineHeight?: string
  textDecoration?: TTextDecoration
  stroke?: TStroke
  fontStyle?: TFontStyle
  wordBreak?: TWordBreak
}
export const Flex = styled.view<FlexProps>`
  width: ${props => (props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : 'auto')};
  height: ${props => (props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : 'auto')};
  box-sizing: ${props => props.boxSizing ? props.boxSizing : 'border-box'};
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border: ${props => props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none'};
  overflow: ${props => props.overflow || 'visible'};
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0)'};
  background-image: ${props => props.bgImage ? props.bgImage : props.bgGradient ? 'linear-gradient(' + props.bgGradient.toString() + ')' : 'none'};
  backdrop-filter: ${props => props.backdrop ? `blur(${props.backdrop}px)` : 'none'};
  pointer-events: ${props => props.pointerEvents || 'auto'};
  min-height: ${props => props.minHeight ? props.minHeight + ZPX : 'none'};
  max-height: ${props => props.maxHeight ? props.maxHeight + ZPX : 'none'};
  background-size: ${props => props.bgImageType === 'aspectFit' ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  box-shadow: ${props => props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none'};
  position: ${props => props.position || 'static'};
  left: ${props => props.left ? props.left + ZPX : 'auto'};
  top: ${props => props.top ? props.top + ZPX : 'auto'};
  right: ${props => props.right ? props.right + ZPX : 'auto'};
  bottom: ${props => props.bottom ? props.bottom + ZPX : 'auto'};
  flex-direction: ${props => props.flex[1] === 'c' ? 'column' : 'row'};
  justify-content: ${props => 
    props.flex[2] === 'c' ? 'center' : 
    props.flex[2] === 'b' ? 'space-between': 
    props.flex[2] === 'a' ? 'space-around': 
    props.flex[2] === 'e' ? 'flex-end': 
    props.flex[2] === 's' ? 'flex-start': 'center'
  };
  align-items: ${props => 
    props.flex[3] === 'c' ? 'center' : 
    props.flex[3] === 'b' ? 'space-between': 
    props.flex[3] === 'a' ? 'space-around': 
    props.flex[3] === 'e' ? 'flex-end': 
    props.flex[3] === 's' ? 'flex-start': 'center'
  };
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  font-size: ${props => (props.fontSize || '32') + ZPX};
  color: ${props => props.color || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  word-break: ${props => props.wordBreak ? props.wordBreak : 'normal'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
  flex-shrink: ${props => props.flexShrink || 'initial'};
` as ElementType<FlexProps>



export interface AnimateProps {
  /** 同 view 组件一样，必须传入动画参数，为实现动画效果 */
  animation: TaroQuickAnimate
  padding?: TPadding
  margin?: TMargin
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  size?: TSize
  radius?: TRadius
  bgColor?: TColor
  shadowColor?: TColor
  zIndex?: TZIndex
  opacity?: TOpacity
  children?: ReactNode
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  minHeight?: TMinHeight
  maxHeight?: TMaxHeight
  onClick?: Function
  boxSizing?: TBoxSizing
  backdrop?: TBackDrop
  className?: string
  overflow?: TOverflow
  borderColor?: TColor
  borderWidth?: TBorderWidth
  borderStyle?: TBorderStyle
  /** Flex 布局时，如果被压缩，可以设置为 0 ,防止变形压缩 */
  flexShrink?: TFlexShrink
  display?: TDisplay
}
export const Animate = (props: AnimateProps) => {
  const {onClick=()=>{}} = props
  return (
    <Viw
      className={props.className}
      onClick={(e)=>{onClick(e)}}
      animation={props.animation}
      style={{
        width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : 'auto',
        height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : 'auto',
        borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
        border: props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none',
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
        boxShadow: props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none',
        zIndex:  props.zIndex ? parseInt(props.zIndex) : 'auto',
        opacity:  props.opacity ? parseFloat(props.opacity) : 'inherit',
        padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
        margin: props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
        fontSize: (props.fontSize || '32') + ZPX,
        color: props.color || '#121212',
        fontWeight: props.fontWeight || 'normal',
        position: props.position || 'static',
        left: props.left ? props.left + ZPX : 'auto',
        top: props.top ? props.top + ZPX : 'auto',
        right: props.right ? props.right + ZPX : 'auto',
        bottom: props.bottom ? props.bottom + ZPX : 'auto',
        overflow: props.overflow || 'visible',
        boxSizing: props.boxSizing ? props.boxSizing : 'border-box',
        minHeight: props.minHeight ? props.minHeight + ZPX : 'none',
        maxHeight: props.maxHeight ? props.maxHeight + ZPX : 'none',
        flexShrink: props.flexShrink || 'initial',
        display: props.display || 'block', 
      }}
    >
      {props.children}
    </Viw>
  )
}



export interface PressProps {
  size?: TSize
  padding?: TPadding
  margin?: TMargin
  display?: TDisplay
  children?: ReactNode
  onClick?: Function
  onTouchStart?: Function
  onGetPhoneNumber?: Function
  /** 点击时，效果颜色 */
  hoverBgColor?: THoverBgColor
  /** 对应小程序的 open-type 类型 */
  openType?: 'none' | 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback'
  animation?: TaroQuickAnimate
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  zIndex?: TZIndex
  radius?: TRadius
  boxSizing?: TBoxSizing
  overflow?: TOverflow
  /** Flex 布局时，如果被压缩，可以设置为 0 ,防止变形压缩 */
  flexShrink?: TFlexShrink
}
const hoverAnimate = Taro.createAnimation({
  transformOrigin: "50% 50%",
  timingFunction: "linear",
})
export const Press = (props: PressProps) => {
  const [hoverAni, setHoverAni] = useState<TaroQuickAnimate>({actions: []})
  const {onClick=()=>{}, onTouchStart=()=>{}, onGetPhoneNumber=()=>{}, hoverBgColor, openType='none', animation={actions: []}} = props
  return (
    <Blk>
      {
        openType === 'none' ?
        <Viw
          animation={animation.actions.length > 0 ? animation : hoverAni}
          style={{
            width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : 'auto',
            height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : 'auto',
            display: props.display || 'block',
            padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
            margin: props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
            backgroundColor: 'rgba(0,0,0,0)',
            position: props.position || 'static',
            left: props.left ? props.left + ZPX : 'auto',
            top: props.top ? props.top + ZPX : 'auto',
            right: props.right ? props.right + ZPX : 'auto',
            bottom: props.bottom ? props.bottom + ZPX : 'auto',
            zIndex:  props.zIndex ? parseInt(props.zIndex) : 'auto',
            boxSizing: props.boxSizing ? props.boxSizing : 'border-box',
            borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
            flexShrink: props.flexShrink || 'initial',
            overflow: props.overflow || 'visible'
          }}
          onClick={(e) => {
            if(hoverBgColor){
              hoverAnimate
              .backgroundColor(hoverBgColor).step({duration: 150}).backgroundColor('rgba(0,0,0,0)').step({duration: 150})
              setHoverAni(hoverAnimate.export())
            }
            onClick(e)
          }}
          onTouchStart={(e) => {
            onTouchStart(e)
          }}
        >
          {props.children}
        </Viw>
        :
        <Btn
          animation={animation.actions.length > 0 ? animation : hoverAni}
          style={{
            width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : 'auto',
            height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : 'auto',
            display: props.display || 'block',
            padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
            margin: props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
            backgroundColor: 'rgba(0,0,0,0)',
            position: props.position || 'static',
            left: props.left ? props.left + ZPX : 'auto',
            top: props.top ? props.top + ZPX : 'auto',
            right: props.right ? props.right + ZPX : 'auto',
            bottom: props.bottom ? props.bottom + ZPX : 'auto',
            zIndex:  props.zIndex ? parseInt(props.zIndex) : 'auto',
            boxSizing: props.boxSizing ? props.boxSizing : 'border-box',
            borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
            flexShrink: props.flexShrink || 'initial',
            overflow: props.overflow || 'visible'
          }}
          onClick={(e) => {
            if(hoverBgColor){
              hoverAnimate.backgroundColor(hoverBgColor).step({duration: 150}).backgroundColor('rgba(0,0,0,0)').step({duration: 150})
              setHoverAni(hoverAnimate.export())
            }
            onClick(e)
          }}
          onTouchStart={(e) => {
            onTouchStart(e)
          }}
          onGetPhoneNumber={(e) => {
            if(openType === 'getPhoneNumber'){
              onGetPhoneNumber(e)
            }
          }}
          openType={openType}
          className='_press_button'
        >
          {props.children}
        </Btn>
      }
    </Blk>
  )
}







export interface LineProps {
  /** 自适应安全区域。top 为上边距安全，bottom 为底部安全 */
  safe?: TSafeType
  /** 线条颜色 */
  bgColor?: TColor
  size?: string
  radius?: TRadius
  /** Flex 布局时，如果被压缩，可以设置为 0 ,防止变形压缩 */
  flexShrink?: TFlexShrink
  /** 渐变色，即 linear-gradient(23deg, red, blue) => bgGradient={[23deg, red, blue]} */
  bgGradient?: TBgGradient
}
export const Line = styled.view<LineProps>`
  width: ${props => (props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '100%')};
  height: ${props => (props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '1' + ZPX)};
  background-color: ${props => props.bgColor || 'rgba(255,255,255,0)'};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  padding-top: ${props => (props.safe === 'top' ? sys.statusBarHeight + 'PX' : '0')};
  padding-bottom: ${props => (props.safe === 'bottom' ? 'env(safe-area-inset-bottom)': '0')};
  flex-shrink: ${props => props.flexShrink || 'initial'};
  background-image: ${props => props.bgGradient ? 'linear-gradient(' + props.bgGradient.toString() + ')' : 'none'};
` as ElementType<LineProps>





export interface TextProps{
  padding?: TPadding
  margin?: TMargin
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  letterSpacing?: TFontSpacing
  lineHeight?: string
  textDecoration?: TTextDecoration
  opacity?: TOpacity
  /** 即 -webkit-text-stroke */
  stroke?: TStroke
  fontStyle?: TFontStyle
  wordBreak?: TWordBreak
  /** 文字渐变， linear-gradient(to right, #2ea0f9, #5031e7); => gradient={[23deg, red, blue]} */
  gradient?: TBgGradient
  textAlign?: TTextAlign
}
export const Text = styled.text<TextProps>`
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  font-size: ${props => (props.fontSize || '32') + ZPX};
  color: ${props => (props.gradient ? 'transparent' : props.color) || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  word-break: ${props => props.wordBreak ? props.wordBreak : 'normal'};
  text-align: ${props => props.textAlign ? props.textAlign : 'start'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
  background-image: ${props => props.gradient ? 'linear-gradient(' + props.gradient.toString() + ')' : 'none'};
  -webkit-background-clip: text;
` as ElementType<TextProps>

export interface TextEllipsisProps extends TextProps{
  /** 
   * 多选文本自动省略。此值为设置最多显示几行
   * @default '1'
   */
  line?: string
}
export const TextEllipsis = styled.text<TextEllipsisProps>`
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  font-size: ${props => (props.fontSize || '32') + ZPX};
  color: ${props => (props.gradient ? 'transparent' : props.color) || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  display: -webkit-box;
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	white-space: normal !important;
	-webkit-line-clamp: ${props => props.line || '1'};
	-webkit-box-orient: vertical; 
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  text-align: ${props => props.textAlign ? props.textAlign : 'start'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
  background-image: ${props => props.gradient ? 'linear-gradient(' + props.gradient.toString() + ')' : 'none'};
  -webkit-background-clip: text;
` as ElementType<TextEllipsisProps>





export interface ImageProps {
  size?: TSize
  padding?: TPadding
  margin?: TMargin
  radius?: TRadius
  src: string
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  zIndex?: TZIndex
  mode?: 'aspectFill' | 'aspectFit' | 'widthFix' | 'center'
  opacity?: TOpacity
  /** 为 none 时， 图片没有点击事件 */
  pointerEvents?: TPointerEvents
  /** Flex 布局时，如果被压缩，可以设置为 0 ,防止变形压缩 */
  flexShrink?: TFlexShrink
  onClick?: Function
}
export const Image = (props: ImageProps) => (
  <Img 
    onClick={() => {props.onClick && props.onClick()}}
    src={props.src}
    mode={props.mode || 'aspectFill'}
    style={{
      width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : 'auto',
      height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : 'auto',
      padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      margin: props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      display: 'block',
      position: props.position || 'static',
      pointerEvents: props.pointerEvents || 'auto',
      left: props.left ? props.left + ZPX : 'auto',
      top: props.top ? props.top + ZPX : 'auto',
      right: props.right ? props.right + ZPX : 'auto',
      bottom: props.bottom ? props.bottom + ZPX : 'auto',
      zIndex: props.zIndex ? parseInt(props.zIndex) : 'auto',
      opacity: props.opacity ? parseFloat(props.opacity) : 'inherit',
      flexShrink: props.flexShrink || 'initial',
    }}
  />
)



export interface InputProps {
  size?: TSize
  padding?: TPadding
  margin?: TMargin
  radius?: TRadius
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  fontSize?: TFontSize
  color?: TColor
  bgColor?: TColor
  pColor?: TColor
  fontWeight?: TFontWeight
  letterSpacing?: TFontSpacing
  placeholder?: string
  onInput?: Function
  onFocus?: Function
  onBlur?: Function
  onConfirm?: Function
  value?: string | number,
  maxlength?: string
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'number'
  /** Flex 布局时，如果被压缩，可以设置为 0 ,防止变形压缩 */
  flexShrink?: TFlexShrink
}
export const Input = (props: InputProps) => (
  <Int
    onInput={(e) => {props.onInput && props.onInput(e.detail.value)}}
    onFocus={(e) => {props.onFocus && props.onFocus(e.detail.value)}}
    onBlur={(e) => {props.onBlur && props.onBlur(e.detail.value)}}
    onConfirm={(e) => {props.onConfirm && props.onConfirm(e.detail.value)}}
    value={props.value ? props.value.toString() : ''}
    placeholder={props.placeholder || '请输入内容'}
    placeholderStyle={`
      color: ${props.pColor || '#8c8c8c'};
    `}
    type={props.type || 'text'}
    maxlength={parseInt(props.maxlength || '140')}
    style={{
      width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '100%',
      height: props.size ? (props.size.split(' ')[1].includes('auto') ? '80' + ZPX : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '80' + ZPX,
      padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      margin: props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      display: 'block',
      boxSizing: 'border-box',
      backgroundColor: props.bgColor || '#ffffff',
      fontSize: (props.fontSize || '32') + ZPX,
      color: props.color || '#181818',
      fontWeight: props.fontWeight || 'normal',
      letterSpacing: props.letterSpacing ? props.letterSpacing + ZPX : 'normal',
      flexShrink: props.flexShrink || 'initial',
    }}
  />
)

export interface TextareaProps extends InputProps{
  autoHeight?: boolean
}
export const Textarea = (props: TextareaProps) => (
  <Tarea
    onInput={(e) => {props.onInput && props.onInput(e.detail.value)}}
    value={props.value ? props.value.toString() : ''}
    placeholder={props.placeholder || '请输入内容'}
    placeholderStyle={`
      color: ${props.pColor || '#acacac'};
    `}
    maxlength={parseInt(props.maxlength || '140')}
    autoHeight={props.autoHeight || false}
    style={{
      width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '100%',
      height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '168' + ZPX,
      padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      margin: props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      display: 'block',
      boxSizing: 'border-box',
      backgroundColor: props.bgColor || '#efefef',
      fontSize: (props.fontSize || '32') + ZPX,
      color: props.color || '#181818',
      fontWeight: props.fontWeight || 'normal',
      letterSpacing: props.letterSpacing ? props.letterSpacing + ZPX : 'normal',
      flexShrink: props.flexShrink || 'initial',
    }}
  />
)



export interface ButtonProps {
  /** 按钮是否正在加载，如果为 true 时，点击事件将阻塞 */
  loading?: boolean
  letterSpacing?: TFontSpacing
  children: ReactNode
  onClick?: Function
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  /** 
   * 优化安卓上面的动画。如果要通过按钮实现小程序的订阅之类的事件，则这个值要设置为 false 
   * @default true
   */
  isFixAnimate?: boolean
  /** 按钮禁用 */
  disable?: boolean
  size?: TSize
  /**
   * 圆角，如果四个角都要设置圆角，则写成 ‘15’。如果分别设置，则为 ‘12 2 12 2’，左上 右上 右下 左下
   */
  radius?: TRadius
  overflow?: TOverflow
  bgColor?: TColor
  bgImage?: TColor
  bgImageType?: TBgImageType
  shadowColor?: TColor
  borderColor?: TColor
  zIndex?: TZIndex
  opacity?: TOpacity
  margin?: TMargin
  /** Flex 布局时，如果被压缩，可以设置为 0 ,防止变形压缩 */
  flexShrink?: TFlexShrink
  borderWidth?: TBorderWidth
  borderStyle?: TBorderStyle
}
export const Button = (props: ButtonProps) => {
  const {onClick=() => {},loading=false, isFixAnimate=true} = props
  return (
    <Viw 
      className={props.disable ? '_color_button_disable' : '_color_button'}
      style={{
        width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '300' + ZPX,
        height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '80' + ZPX,
        borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '15' + ZPX,
        border: props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none',
        backgroundColor: props.bgColor || '#1890ff',
        backgroundImage: props.bgImage || 'none',
        backgroundSize: props.bgImageType === 'aspectFit' ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: props.shadowColor ? !props.disable ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} rgba(204, 204, 204, 0.61)` : 'none',
        zIndex:  props.zIndex ? parseInt(props.zIndex) : 'auto',
        opacity:  props.opacity ? parseFloat(props.opacity) : 'inherit',
        letterSpacing: (props.letterSpacing || '10') + ZPX,
        paddingLeft: props.letterSpacing ? ((props.letterSpacing === 'normal' ? '0' : props.letterSpacing) + ZPX) : '10' + ZPX,
        margin: props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
        fontSize: (props.fontSize || '32') + ZPX,
        color: props.color || '#ffffff',
        fontWeight: props.fontWeight || 'normal',
        flexShrink: props.flexShrink || 'initial',
      }}
      onClick={(e) => {
        if(props.disable) return
        if(loading) return
        if(sys.platform === 'android' && isFixAnimate){
          setTimeout(() => {
            onClick(e)
          }, 180)
        }else{
          onClick(e)
        }
      }}
    >
      {loading && <Viw className='_color_button_circle_loading' />}
      {props.children}
    </Viw>
  )
}





export interface SwiperProps{
  size?: TSize
  /** 每个页面的列表，组件 */
  childList: ReactNode[]
  onChange?: Function
  current?: number
  autoplay?: boolean
  circular?: boolean
  vertical?: boolean
  duration?: number
  radius?: TRadius
  padding?: TPadding
  bgColor?: TColor
}
export const Swiper = (props: SwiperProps) => (
  <Swi
    style={{
      width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '100%',
      height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '100%',
      padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
      overflow: 'hidden',
      backgroundColor: props.bgColor || '#1890ff',
    }}
    duration={props.duration || 500}
    vertical={props.vertical || false}
    circular={props.circular || false}
    autoplay={props.autoplay || false}
    current={props.current || 0}
    onChange={(e) => {
      if(props.onChange) props.onChange(e.detail.current)
    }}
  >
    {
      props.childList.map((item, index) => (
        <SwiI key={index + '1066'}>
          {item}
        </SwiI>
      ))
    }
  </Swi>
)


export interface SwitchProps {
  disable?: boolean
  checked?: boolean
  bgColor?: string
  onChange?: (value: boolean) => void
}
export const Switch = (props: SwitchProps) => {
  const {onChange=()=>{}} = props
  return (
    <Sch 
      disabled={props.disable || false}
      checked={props.checked || false}
      color={props.bgColor || '#1890ff'}
      onChange={e => onChange(e.detail.value)}
    />
  )
}



export interface ScrollViewProps {
  id?: string
  size?: TSize
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  scrollX?: boolean
  scrollY?: boolean
  
  upperThreshold?: string
  lowerThreshold?: string 
  scrollTop?: string
  scrollLeft?: string
  enableFlex?: boolean
  onScrollToUpper?: (event: any) => void
  onScrollToLower?: (event: any) => void
  onScroll?: (event: any) => void
  children?: ReactNode
  radius?: TRadius
  padding?: TPadding
  bgColor?: TColor
  scrollIntoView?: string
  scrollWithAnimation?: boolean
  enhanced?: boolean
  bounces?: boolean
  onDragStart?: (event: any) => void
  onDragging?: (event: any) => void
  onDragEnd?: (event: any) => void
  zIndex?: TZIndex
}
export const ScrollView = (props: ScrollViewProps) => {
  const {
    scrollX, scrollY, upperThreshold='50', lowerThreshold='50',
    scrollTop, scrollLeft, enableFlex, id,
    onScrollToUpper=()=>{}, onScrollToLower=()=>{},
    onScroll=()=>{}, children, scrollIntoView, scrollWithAnimation,
    enhanced, bounces, onDragStart=()=>{}, onDragging=()=>{}, onDragEnd=()=>{}
  } = props
  return (
    <ScV 
      id={id}
      style={{
        width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '100%',
        height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '100%',
        padding: props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
        borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX,
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: props.bgColor || '',
        position: props.position || 'static',
        left: props.left ? props.left + ZPX : 'auto',
        top: props.top ? props.top + ZPX : 'auto',
        right: props.right ? props.right + ZPX : 'auto',
        bottom: props.bottom ? props.bottom + ZPX : 'auto',
        zIndex:  props.zIndex ? parseInt(props.zIndex) : 'auto',
      }}
      scrollX={scrollX || false}
      scrollY={scrollY || false}
      upperThreshold={+upperThreshold}
      lowerThreshold={+lowerThreshold}
      scrollTop={scrollTop ? +scrollTop : undefined}
      scrollLeft={scrollLeft ? +scrollLeft : undefined}
      enableFlex={enableFlex || false}
      onScrollToUpper={onScrollToUpper}
      onScrollToLower={onScrollToLower}
      onScroll={onScroll}
      scrollIntoView={scrollIntoView}
      scrollWithAnimation={scrollWithAnimation || false}
      enhanced={enhanced}
      bounces={bounces}
      onDragStart={onDragStart}
      onDragging={onDragging}
      onDragEnd={onDragEnd}
    >
      {children}
    </ScV>
  )
}


