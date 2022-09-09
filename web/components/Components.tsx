import React, { ReactNode, Fragment } from 'react'
import { styled } from '@linaria/react'
import {ZPX} from '../constants/constants'
import './widget.css'


// 通用样式定义
// type TColor = '#181818' | '#7b7b7b' | '#acacac' | '#d2d2d2' | '#dddddd' | '#efefef' | '#f2f2f2' | '#ffffff' |
// '#ff7310' | 
// '#fa5151' | '#c87d2f' | '#ffc300' | '#91d300' | '#95ec69' | '#07c160' | 
// '#10aeff' | '#1485ee' | '#6467f0' | '#576b95'
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
export type TSafeType = 'bottom'
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

export type TBorderWidth = string
export type TBorderStyle = "dotted" | "dashed" | "solid" | 
                            "double" | "groove" | "ridge" | "inset" |
                            "outset" | "none" | "hidden"
export type TCursor = "pointer" | "auto"

// 块
interface BlockProps{
  children?: ReactNode
}
export const Block = (props: BlockProps) => (
  <Fragment>{props.children}</Fragment>
)





// 容器
interface BoxBase {
  size?: TSize
  radius?: TRadius
  overflow?: TOverflow
  boxSizing?: TBoxSizing
  bgColor?: TColor
  bgImage?: TColor
  bgImageType?: TBgImageType
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  shadowColor?: TColor
  borderColor?: TColor
  zIndex?: TZIndex
  opacity?: TOpacity
  backdrop?: TBackDrop
  minHeight?: TMinHeight
  maxHeight?: TMaxHeight
  pointerEvents?: TPointerEvents
  /** 边框宽度，默认为 '1'，且只有当 borderColor 有值时，宽度才生效。目前不支持单边设置，但你可以用 Line 组件实现 */
  borderWidth?: TBorderWidth
  /** 边框样式，，默认 solid */
  borderStyle?: TBorderStyle
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  letterSpacing?: TFontSpacing
  lineHeight?: string
  textDecoration?: TTextDecoration
  stroke?: TStroke
  fontStyle?: TFontStyle

  cursor?: TCursor
  hoverBgColor?: string
  hoverColor?: string
  transitionSec?: string
}
interface BoxProps extends BoxBase{
  display?: TDisplay
  padding?: TPadding
  margin?: TMargin
  flexWrap?: TFlexWrap
  whiteSpace?: TWhiteSpace
}
export const Box = styled.div<BoxProps>`
  width: ${props => props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0].includes('(') ? 'calc' + props.size.split(' ')[0].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[0] + ZPX) : 'auto'};
  height: ${props => props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1].includes('(') ? 'calc' + props.size.split(' ')[1].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[1] + ZPX) : 'auto'};
  box-sizing: ${props => props.boxSizing ? props.boxSizing : 'border-box'};
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border: ${props => props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none'};
  overflow: ${props => props.overflow || 'visible'};
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0)'};
  background-image: ${props => props.bgImage || 'none'};
  backdrop-filter: ${props => props.backdrop || 'none'};
  pointer-events: ${props => props.pointerEvents || 'auto'};
  white-space: ${props => props.whiteSpace || 'normal'};
  min-height: ${props => props.minHeight ? props.minHeight + ZPX : 'none'};
  max-height: ${props => props.maxHeight ? props.maxHeight + ZPX : 'none'};
  background-size: ${props => props.bgImageType === 'aspectFit' ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center;
  display: ${props => props.display || 'block'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  box-shadow: ${props => props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none'};
  position: ${props => props.position || 'static'};
  left: ${props => props.left ? props.left + ZPX : 'auto'};
  top: ${props => props.top ? props.top + ZPX : 'auto'};
  right: ${props => props.right ? props.right + ZPX : 'auto'};
  bottom: ${props => props.bottom ? props.bottom + ZPX : 'auto'};
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  font-size: ${props => (props.fontSize || '1') + ZPX};
  color: ${props => props.color || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
`


interface SafeAreaProps extends BoxBase{
  safe: TSafeType
  display?: TDisplay
  flexWrap?: TFlexWrap
  whiteSpace?: TWhiteSpace
}
export const SafeArea = styled.div<SafeAreaProps>`
  width: ${props => props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0].includes('(') ? 'calc' + props.size.split(' ')[0].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[0] + ZPX) : 'auto'};
  height: ${props => props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1].includes('(') ? 'calc' + props.size.split(' ')[1].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[1] + ZPX) : 'auto'};
  box-sizing: content-box;
  padding-bottom: ${props => (props.safe === 'bottom' ? 'env(safe-area-inset-bottom)': '0')};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border: ${props => props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none'};
  overflow: ${props => props.overflow || 'visible'};
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0)'};
  background-image: ${props => props.bgImage || 'none'};
  backdrop-filter: ${props => props.backdrop || 'none'};
  pointer-events: ${props => props.pointerEvents || 'auto'};
  white-space: ${props => props.whiteSpace || 'normal'};
  min-height: ${props => props.minHeight ? props.minHeight + ZPX : 'none'};
  max-height: ${props => props.maxHeight ? props.maxHeight + ZPX : 'none'};
  background-size: ${props => props.bgImageType === 'aspectFit' ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center;
  display: ${props => props.display || 'block'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  box-shadow: ${props => props.shadowColor ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : 'none'};
  position: ${props => props.position || 'static'};
  left: ${props => props.left ? props.left + ZPX : 'auto'};
  top: ${props => props.top ? props.top + ZPX : 'auto'};
  right: ${props => props.right ? props.right + ZPX : 'auto'};
  bottom: ${props => props.bottom ? props.bottom + ZPX : 'auto'};
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  font-size: ${props => (props.fontSize || '2.125') + ZPX};
  color: ${props => props.color || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
`

interface FlexProps extends BoxBase{
  flex: TFlexWay
  padding?: TPadding
  margin?: TMargin
}
export const Flex = styled.div<FlexProps>`
  width: ${props => props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0].includes('(') ? 'calc' + props.size.split(' ')[0].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[0] + ZPX) : 'auto'};
  height: ${props => props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1].includes('(') ? 'calc' + props.size.split(' ')[1].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[1] + ZPX) : 'auto'};
  box-sizing: ${props => props.boxSizing ? props.boxSizing : 'border-box'};
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border: ${props => props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none'};
  overflow: ${props => props.overflow || 'visible'};
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0)'};
  background-image: ${props => props.bgImage || 'none'};
  backdrop-filter: ${props => props.backdrop || 'none'};
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
  font-size: ${props => (props.fontSize || '1') + ZPX};
  color: ${props => props.color || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
`




// 点击
interface PressProps {
  display?: TDisplay
  children?: ReactNode
  onClick?: Function
  type?: 'none' | 'op'
}
export const Press = (props: PressProps) => {
  const {onClick=()=>{}, type='op',} = props
  return (
    <div
      className='_press_cursor'
      style={{display: props.display || 'block'}}
      onClick={(e) => {onClick(e)}}
    >
      {props.children}
    </div>
  )
}






// 横线
interface LineProps {
  safe?: TSafeType
  bgColor?: TColor
  size?: string
  radius?: TRadius
}
export const Line = styled.div<LineProps>`
  width: ${props => props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0].includes('(') ? 'calc' + props.size.split(' ')[0].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[0] + ZPX) : '100%'};
  height: ${props => props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1].includes('(') ? 'calc' + props.size.split(' ')[1].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[1] + ZPX) : '1' + ZPX};
  background-color: ${props => props.bgColor || 'rgba(255,255,255,0)'};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  padding-bottom: ${props => (props.safe === 'bottom' ? 'env(safe-area-inset-bottom)': '0')};
`





// 字体
interface TextProps{
  padding?: TPadding
  margin?: TMargin
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  letterSpacing?: TFontSpacing
  lineHeight?: string
  textDecoration?: TTextDecoration
  opacity?: TOpacity
  stroke?: TStroke
  fontStyle?: TFontStyle
}
export const Text = styled.span<TextProps>`
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  font-size: ${props => (props.fontSize || '1') + ZPX};
  color: ${props => props.color || '#181818'};
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  line-height: ${props => props.lineHeight ? props.lineHeight + ZPX : 'normal'};
  text-decoration: ${props => props.textDecoration ? props.textDecoration : 'none'};
  opacity: ${props => props.opacity ? props.opacity : 'inherit'};
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
`
interface TextEllipsisProps extends TextProps{
  line?: string
}
export const TextEllipsis = styled.span<TextEllipsisProps>`
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  font-size: ${props => (props.fontSize || '1') + ZPX};
  color: ${props => props.color || '#181818'};
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
  -webkit-text-stroke: ${props => (props.stroke ? (props.stroke.split(' ').length > 0 ? props.stroke.split(' ')[0] + ZPX + ' ' + props.stroke.split(' ')[1] : props.stroke.split(' ')[0]) : 'unset')};
`





// 图片
interface ImageProps {
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
  opacity?: TOpacity
  pointerEvents?: TPointerEvents
}
export const Image = styled.img<ImageProps>`
  width: ${props => props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0].includes('(') ? 'calc' + props.size.split(' ')[0].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[0] + ZPX) : 'auto'};
  height: ${props => props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1].includes('(') ? 'calc' + props.size.split(' ')[1].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[1] + ZPX) : 'auto'};
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  display: block;
  position: ${props => props.position || 'static'};
  pointer-events: ${props => props.pointerEvents || 'auto'};
  left: ${props => props.left ? props.left + ZPX : 'auto'};
  top: ${props => props.top ? props.top + ZPX : 'auto'};
  right: ${props => props.right ? props.right + ZPX : 'auto'};
  bottom: ${props => props.bottom ? props.bottom + ZPX : 'auto'};
  z-index: ${props => props.zIndex ? parseInt(props.zIndex) : 'auto'};
  opacity: ${props => props.opacity ? parseFloat(props.opacity) : 'inherit'};
`

// Input
interface InputProps {
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
}
export const Input = styled.input<InputProps>`
  width: ${(props: any) => props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '100%'};
  height: ${(props: any) => props.size ? (props.size.split(' ')[1].includes('auto') ? '2.5' + ZPX : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '5' + ZPX};
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  display: 'block'};
  box-sizing: 'border-box'};
  background-color: ${props => props.bgColor || '#efefef'};
  font-size: ${props => (props.fontSize || '0.9') + ZPX};
  color: ${props => props.color || '#181818'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  &::-webkit-input-placeholder{
    color: ${props => props.pColor || '#999999'};
  }
`

interface TextareaProps extends InputProps{
  
}
export const Textarea = styled.textarea<TextareaProps>`
  width: ${(props: any) => props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0] + ZPX) : '100%'};
  height: ${(props: any) => props.size ? (props.size.split(' ')[1].includes('auto') ? '2.5' + ZPX : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1] + ZPX) : '5' + ZPX};
  padding: ${props => props.padding ? (props.padding.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  margin: ${props => props.margin ? (props.margin.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  border-radius: ${props => props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0' + ZPX};
  display: 'block'};
  box-sizing: 'border-box'};
  background-color: ${props => props.bgColor || '#efefef'};
  font-size: ${props => (props.fontSize || '0.9') + ZPX};
  color: ${props => props.color || '#181818'};
  font-weight: ${props => props.fontWeight || 'normal'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing + ZPX : 'normal'};
  &::-webkit-input-placeholder{
    color: ${props => props.pColor || '#999999'};
  }
`



/** 按钮 */

interface ButtonProps {
  loading?: boolean
  letterSpacing?: TFontSpacing
  children: ReactNode
  onClick?: Function
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  isFixAnimate?: boolean
  disable?: boolean
  size?: TSize
  radius?: TRadius
  overflow?: TOverflow
  boxSizing?: TBoxSizing
  bgColor?: TColor
  bgImage?: TColor
  bgImageType?: TBgImageType
  shadowColor?: TColor
  borderColor?: TColor
  zIndex?: TZIndex
  opacity?: TOpacity
  margin?: TMargin
  borderWidth?: TBorderWidth
  borderStyle?: TBorderStyle
}
export const Button = (props: ButtonProps) => {
  const {onClick=() => {},loading=false} = props
  return (
    <button 
      className={props.disable ? '_color_button_disable fccc' : '_color_button fccc'}
      style={{
        width: props.size ? (props.size.split(' ')[0].includes('auto') ? 'auto' : props.size.split(' ')[0].includes('%') ? props.size.split(' ')[0] : props.size.split(' ')[0].includes('(') ? 'calc' + props.size.split(' ')[0].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[0] + ZPX) : '4' + ZPX,
        height: props.size ? (props.size.split(' ')[1].includes('auto') ? 'auto' : props.size.split(' ')[1].includes('%') ? props.size.split(' ')[1] : props.size.split(' ')[1].includes('(') ? 'calc' + props.size.split(' ')[1].replace(/([\-\+])/g, ' $1 ') : props.size.split(' ')[1] + ZPX) : '1.2' + ZPX,
        borderRadius: props.radius ? (props.radius.replace(/\s/g, ZPX + ' ') + ZPX) : '0.2' + ZPX,
        border: props.borderColor ? `${(props.borderWidth || 1)+ZPX} ${props.borderStyle || 'solid'} ${props.borderColor}` : 'none',
        backgroundColor: props.bgColor || '#1890ff',
        backgroundImage: props.bgImage || 'none',
        backgroundSize: props.bgImageType === 'aspectFit' ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: props.shadowColor ? !props.disable ? `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} ${props.shadowColor}` : `1${ZPX} 1${ZPX} 10${ZPX} 5${ZPX} rgba(204, 204, 204, 0.61)` : 'none',
        zIndex:  props.zIndex ? parseInt(props.zIndex) : 'auto',
        opacity:  props.opacity ? parseFloat(props.opacity) : 'inherit',
        letterSpacing: (props.letterSpacing || '0') + ZPX,
        paddingLeft: props.letterSpacing ? ((props.letterSpacing === 'normal' ? '0' : props.letterSpacing) + ZPX) : '0' + ZPX,
        margin: props.margin ? props.margin + ZPX : '0' + ZPX,
        fontSize: (props.fontSize || '0.9') + ZPX,
        color: props.color || '#ffffff',
        fontWeight: props.fontWeight || 'normal',
      }}
      onClick={(e) => {
        if(props.disable) return
        if(props.isFixAnimate){
          setTimeout(() => {
            onClick(e)
          }, 240)
        }else{
          onClick(e)
        }
      }}
    >
      {loading && <div className='_color_button_circle_loading' />}
      {props.children}
    </button>
  )
}






export default {
  Block,
  Box,
  SafeArea,
  Press,
  Flex,
  Line,
  Text,
  TextEllipsis,
  Image,
  Input,
  Textarea,
  Button,
}
