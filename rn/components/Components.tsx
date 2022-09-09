import React, { ReactNode, useRef, useMemo, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import {
  Text as Txt,
  Image as Img, 
  View as Viw,
  Block as Blk,
  Swiper as Swi,
  SwiperItem as SwiI,
  Button as Btn,
  Switch as Sch,
  ScrollView as ScV,
} from '@tarojs/components-rn'
import {
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Platform,
  ImageBackground,
} from 'react-native'

import {RTX} from '../constants/constants'
import {changeS4, changeS2} from '../constants/utils'

const sys = Taro.getSystemInfoSync()

export type TFontSize = string

export type TFontWeight = 'normal' | 'bold' | '900' | '800' | '700' | '600' |
                '500' | '400' | '300' | '200' | '100' | 'bolder' | 'lighter'
export type TFontSpacing = string
export type TOverflow = 'visible' | 'hidden' | 'scroll'
export type TDisplay = 'flex' | 'block' | 'inline-block' | 'none'
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
export type TPosition = 'absolute' | 'relative' | 'static'
export type TBgImageType = 'aspectFit' | 'aspectFill'
export type TSafeType = 'top' | 'bottom'
export type TTextDecoration = 'underline' | 'none' | 'line-through'
export type TFlexWrap = 'nowrap' | 'wrap'
export type TFontStyle = 'normal' | 'italic'
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
export type TBorderWidth = string
export type TBgImage = string
export type TAnimation = any
export type TTextAlign = 'left' | 'right' | 'center'
export type TJustifyContent = 'center' | 'space-between' | 'space-around' | 'flex-end' | 'flex-start'


const keyboardTypeMap: any = {
  text: 'default',
  number: 'numeric',
  idcard: 'default',
  digit: Platform.select({
      ios: 'decimal-pad',
      android: 'numeric'
  }) || ''
}



// 块
interface BlockProps{
  children?: ReactNode
}
export const Block = (props: BlockProps) => (
  <Blk>{props.children}</Blk>
)





// 容器
interface BoxBase {
  children?: ReactNode
  size?: TSize
  radius?: TRadius
  overflow?: TOverflow
  bgColor?: TColor
  position?: TPosition
  left?: TLeft
  top?: TTop
  right?: TRight
  bottom?: TBottom
  borderColor?: TColor
  zIndex?: TZIndex
  opacity?: TOpacity
  minHeight?: TMinHeight
  maxHeight?: TMaxHeight
  pointerEvents?: TPointerEvents
  borderWidth?: TBorderWidth
  onClick?: Function
}
interface BoxProps extends BoxBase{
  display?: TDisplay
  padding?: TPadding
  margin?: TMargin
  flexWrap?: TFlexWrap
  justifyContent?: TJustifyContent
}
export const Box = (props: BoxProps) => {  
  return (
    <Viw
      onClick={props.onClick}
      style={{
        width: props.size ? changeS2(props.size)[0] : 'auto',
        height: props.size ? changeS2(props.size)[1] : 'auto',
        paddingTop: changeS4(props.padding)[0] || 0,
        paddingRight: changeS4(props.padding)[1] || 0,
        paddingBottom: changeS4(props.padding)[2] || 0,
        paddingLeft: changeS4(props.padding)[3] || 0,
        marginTop: changeS4(props.margin)[0] || 0,
        marginRight: changeS4(props.margin)[1] || 0,
        marginBottom: changeS4(props.margin)[2] || 0,
        marginLeft: changeS4(props.margin)[3] || 0,
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        borderWidth: props.borderColor ? +(props.borderWidth || 1) : 0,
        borderColor: props.borderColor ? props.borderColor : null,
        overflow: props.overflow || 'visible',
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
        // shadowColor: '#aaa',
        // shadowOpacity: 0.3,
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        alignSelf: props.display === 'inline-block' ? 'flex-start' : null,
        position: props.position || 'relative',
        left: props.left ? +props.left * RTX : null,
        top: props.top ? +props.top * RTX : null,
        right: props.right ? +props.right * RTX : null,
        bottom: props.bottom ? +props.bottom * RTX : null,
        minHeight: props.minHeight ? +props.minHeight * RTX : null,
        maxHeight: props.maxHeight ? +props.maxHeight * RTX : null,
        flexWrap: props.flexWrap || 'nowrap',
        flexDirection: props.flexWrap ? 'row' : null,
        justifyContent: props.justifyContent ? props.justifyContent : null,
        zIndex: props.zIndex ? +props.zIndex : null,
        opacity: props.opacity ? +props.opacity : 1,
      }}
    >
      {props.children}
    </Viw>
  )
}
  


interface SafeAreaProps extends BoxBase{
  safe: TSafeType
  display?: TDisplay
  flexWrap?: TFlexWrap
  justifyContent?: TJustifyContent
}
export const SafeArea = (props: SafeAreaProps) => {
  const height = useMemo(() => {
    let baseH: number = (props.size ? changeS2(props.size)[1] : 1) as number
    if(props.safe === 'top'){
      return baseH + sys.statusBarHeight
    }
    if(props.safe === 'bottom'){
      return baseH + sys.screenHeight - sys.safeArea.bottom
    }
    return baseH
  }, [props.size, props.safe])
  return (
    <Viw
      onClick={props.onClick}
      style={{
        width: props.size ? changeS2(props.size)[0] : 'auto',
        height: height,
        paddingTop: props.safe === 'top' ? sys.statusBarHeight : 0,
        paddingBottom: props.safe === 'bottom' ? sys.screenHeight - sys.safeArea.bottom : 0,
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        borderWidth: props.borderColor ? +(props.borderWidth || 1) : 0,
        borderColor: props.borderColor ? `${props.borderColor}` : '',
        overflow: props.overflow || 'visible',
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
        minHeight: props.minHeight ? +props.minHeight * RTX : null,
        maxHeight: props.maxHeight ? +props.maxHeight * RTX : null,
        flexWrap: props.flexWrap || 'nowrap',
        flexDirection: props.flexWrap ? 'row' : null,
        justifyContent: props.justifyContent ? props.justifyContent : null,
        // shadowColor: props.shadowColor ? `${props.shadowColor}` : '',
        // shadowOffset: {
        //   width: props.shadowColor ? 1 : 0,
        //   height: props.shadowColor ? 1 : 0,
        // },
        alignSelf: props.display === 'inline-block' ? 'flex-start' : null,
        position: props.position || 'relative',
        left: props.left ? +props.left * RTX : null,
        top: props.top ? +props.top * RTX : null,
        right: props.right ? +props.right * RTX : null,
        bottom: props.bottom ? +props.bottom * RTX : null,
        zIndex: props.zIndex ? +props.zIndex : null,
        opacity: props.opacity ? +props.opacity : 1,
      }}
    >
      {props.children}
    </Viw>
  )
}


interface FlexProps extends BoxBase{
  flex: TFlexWay
  padding?: TPadding
  margin?: TMargin
}
export const Flex = (props: FlexProps) => {
  return (
    <Viw
      onClick={props.onClick}
      style={{
        width: props.size ? changeS2(props.size)[0] : 'auto',
        height: props.size ? changeS2(props.size)[1] : 'auto',
        paddingTop: changeS4(props.padding)[0] || 0,
        paddingRight: changeS4(props.padding)[1] || 0,
        paddingBottom: changeS4(props.padding)[2] || 0,
        paddingLeft: changeS4(props.padding)[3] || 0,
        marginTop: changeS4(props.margin)[0] || 0,
        marginRight: changeS4(props.margin)[1] || 0,
        marginBottom: changeS4(props.margin)[2] || 0,
        marginLeft: changeS4(props.margin)[3] || 0,
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        borderWidth: props.borderColor ? +(props.borderWidth || 1) : 0,
        borderColor: props.borderColor ? props.borderColor : null,
        overflow: props.overflow || 'visible',
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
        // shadowColor: '#aaa',
        // shadowOpacity: 0.3,
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        position: props.position || 'relative',
        left: props.left ? +props.left * RTX : null,
        top: props.top ? +props.top * RTX : null,
        right: props.right ? +props.right * RTX : null,
        bottom: props.bottom ? +props.bottom * RTX : null,
        minHeight: props.minHeight ? +props.minHeight * RTX : null,
        maxHeight: props.maxHeight ? +props.maxHeight * RTX : null,
        zIndex: props.zIndex ? +props.zIndex : null,
        opacity: props.opacity ? +props.opacity : 1,
        flexDirection: props.flex[1] === 'c' ? 'column' : 'row',
        justifyContent:
          props.flex[2] === 'c' ? 'center' : 
          props.flex[2] === 'b' ? 'space-between': 
          props.flex[2] === 'a' ? 'space-around': 
          props.flex[2] === 'e' ? 'flex-end': 
          props.flex[2] === 's' ? 'flex-start': 'center',
        alignItems:
          props.flex[3] === 'c' ? 'center' : 
          props.flex[3] === 'b' ? 'space-between': 
          props.flex[3] === 'a' ? 'space-around': 
          props.flex[3] === 'e' ? 'flex-end': 
          props.flex[3] === 's' ? 'flex-start': 'center',
      }}
    >
      {props.children}
    </Viw>
  )
}


interface BoxImgProps extends BoxBase {
  children?: ReactNode
  size?: TSize
  radius?: TRadius
  bgColor?: TColor
  overflow?: TOverflow
  borderColor?: TColor
  zIndex?: TZIndex
  opacity?: TOpacity
  /** 图片地址 requie('')  或 {uri: 'httpxx.jpg} */
  bgImage: any
  padding?: TPadding
  margin?: TMargin
}
export const BoxImg = (props: BoxImgProps) => {  
  return (
    <ImageBackground
      source={props.bgImage}
      style={{
        width: props.size ? changeS2(props.size)[0] : '100%',
        height: props.size ? changeS2(props.size)[1] : '100%',
        paddingTop: changeS4(props.padding)[0] || 0,
        paddingRight: changeS4(props.padding)[1] || 0,
        paddingBottom: changeS4(props.padding)[2] || 0,
        paddingLeft: changeS4(props.padding)[3] || 0,
        marginTop: changeS4(props.margin)[0] || 0,
        marginRight: changeS4(props.margin)[1] || 0,
        marginBottom: changeS4(props.margin)[2] || 0,
        marginLeft: changeS4(props.margin)[3] || 0,
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        overflow: props.overflow || 'visible',
        opacity: props.opacity ? +props.opacity : 1,
      }}
    >
      {props.children}
    </ImageBackground>
  )
}

// 点击
interface PressProps {
  size?: TSize
  children?: ReactNode
  opacity?: THoverBgColor
  onClick?: Function
  onPressIn?: Function
  onPressOut?: Function
  radius?: TRadius
  padding?: TPadding
  bgColor?: TColor
}
export const Press = (props: PressProps) => {
  const {onClick=()=>{}, opacity='0.6', onPressIn=()=>{}, onPressOut=()=>{}} = props
  
  return (
    <TouchableOpacity
      activeOpacity={+opacity}
      style={{
        width: props.size ? changeS2(props.size)[0] : 'auto',
        height: props.size ? changeS2(props.size)[1] : 'auto',
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        paddingTop: changeS4(props.padding)[0] || 0,
        paddingRight: changeS4(props.padding)[1] || 0,
        paddingBottom: changeS4(props.padding)[2] || 0,
        paddingLeft: changeS4(props.padding)[3] || 0,
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
      }}
      onPress={(e) => {
        onClick(e)
      }}
      onPressIn={(e) => {
        onPressIn(e)
      }}
      onPressOut={(e) => {
        onPressOut(e)
      }}
    >
      {props.children}
    </TouchableOpacity>
  )
}








// 横线
interface LineProps {
  safe?: TSafeType
  bgColor?: TColor
  size?: string
  radius?: TRadius
}
export const Line = (props: LineProps) => {
  const height = useMemo(() => {
    let baseH: number = (props.size ? changeS2(props.size)[1] : 1) as number
    if(props.safe === 'top'){
      return baseH + sys.statusBarHeight
    }
    if(props.safe === 'bottom'){
      return baseH + sys.screenHeight - sys.safeArea.bottom
    }
    return baseH
  }, [props.size, props.safe])
  return (
    <Viw 
      style={{
        width: props.size ? changeS2(props.size)[0] : '100%',
        height: height,
        backgroundColor: props.bgColor || 'rgba(255,255,255,0)',
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        paddingTop: props.safe === 'top' ? sys.statusBarHeight : 0,
        paddingBottom: props.safe === 'bottom' ? sys.screenHeight - sys.safeArea.bottom : 0
      }}
    />
  )
}







// 字体
interface TextProps{
  children?: ReactNode
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  lineHeight?: string
  textDecoration?: TTextDecoration
  opacity?: TOpacity
  stroke?: TStroke
  fontStyle?: TFontStyle
  letterSpacing?: string
  textAlign?: TTextAlign
}
export const Text = (props: TextProps) => (
  <Txt
    style={{
      fontSize: props.fontSize ? +props.fontSize * RTX : 32 * RTX,
      color: props.color || '#181818',
      fontStyle: props.fontStyle || 'normal',
      fontWeight: props.fontWeight || 'normal',
      lineHeight: props.lineHeight ? +props.lineHeight * RTX : null,
      textDecorationLine: props.textDecoration ? props.textDecoration : null,
      opacity: props.opacity ? +props.opacity : 1,
      letterSpacing: props.letterSpacing ? +props.letterSpacing : null,
      textAlign: props.textAlign ? props.textAlign : 'left'
    }}
  >
    {props.children}
  </Txt>
)

interface TextEllipsisProps extends TextProps{
  line?: string
}
export const TextEllipsis = (props: TextEllipsisProps) => (
  <Txt
    numberOfLines={+(props.line || '1')}
    style={{
      fontSize: props.fontSize ? +props.fontSize * RTX : 32 * RTX,
      color: props.color || '#181818',
      fontStyle: props.fontStyle || 'normal',
      fontWeight: props.fontWeight || 'normal',
      lineHeight: props.lineHeight ? +props.lineHeight * RTX : null,
      textDecorationLine: props.textDecoration ? props.textDecoration : null,
      opacity: props.opacity ? +props.opacity : 1,
      letterSpacing: props.letterSpacing ? +props.letterSpacing : null,
      textAlign: props.textAlign ? props.textAlign : 'left'
    }}
  >
    {props.children}
  </Txt>
)

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
  mode?: 'aspectFill' | 'aspectFit' | 'widthFix' | 'center'
  opacity?: TOpacity
  pointerEvents?: TPointerEvents
}
export const Image = (props: ImageProps) => (
  <Img 
    src={props.src}
    mode={props.mode || 'aspectFill'}
    style={{
      width: props.size ? changeS2(props.size)[0] : 'auto',
      height: props.size ? changeS2(props.size)[1] : 'auto',
      paddingTop: changeS4(props.padding)[0] || 0,
      paddingRight: changeS4(props.padding)[1] || 0,
      paddingBottom: changeS4(props.padding)[2] || 0,
      paddingLeft: changeS4(props.padding)[3] || 0,
      marginTop: changeS4(props.margin)[0] || 0,
      marginRight: changeS4(props.margin)[1] || 0,
      marginBottom: changeS4(props.margin)[2] || 0,
      marginLeft: changeS4(props.margin)[3] || 0,
      borderTopLeftRadius: changeS4(props.radius)[0] || 0,
      borderTopRightRadius: changeS4(props.radius)[1] || 0,
      borderBottomRightRadius: changeS4(props.radius)[2] || 0,
      borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
      position: props.position || 'relative',
      left: props.left ? +props.left * RTX : null,
      top: props.top ? +props.top * RTX : null,
      right: props.right ? +props.right * RTX : null,
      bottom: props.bottom ? +props.bottom * RTX : null,
      zIndex: props.zIndex ? +props.zIndex : null,
      opacity: props.opacity ? +props.opacity : 1,
    }}
  />
)




// Input
interface InputBase {
  size?: TSize
  disabled?: boolean
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
  placeholder?: string
  onInput?: Function
  // onFocus?: Function
  // onBlur?: Function
  // onConfirm?: Function
  value?: string | number,
  maxlength?: string
}
interface InputProps extends InputBase{
  password?: boolean
  type?: 'text' | 'number' | 'idcard' | 'digit'
}
export const Input = (props: InputProps) => {
  const inputRef = useRef<TextInput>(null)
  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current?.blur()
    })  
    return () => {
      hideSubscription.remove();
    }
  }, [inputRef.current])

  return (
    <TextInput
      ref={inputRef}
      editable={!props.disabled || true}
      secureTextEntry={props.password || false}
      onChangeText={(text) => {
        props.onInput && props.onInput(text)
      }}
      value={props.value ? props.value.toString() : ''}
      placeholder={props.placeholder || '请输入内容'}
      placeholderTextColor={props.pColor || '#8c8c8c'}
      keyboardType={keyboardTypeMap[props.type || 'text']}
      maxLength={+(props.maxlength || '140') === -1 ? undefined : +(props.maxlength || '140')}
      style={{
        width: props.size ? changeS2(props.size)[0] : '100%',
        height: props.size ? changeS2(props.size)[1] : 80 * RTX,
        paddingTop: changeS4(props.padding)[0] || 0,
        paddingRight: changeS4(props.padding)[1] || 0,
        paddingBottom: changeS4(props.padding)[2] || 0,
        paddingLeft: changeS4(props.padding)[3] || 0,
        marginTop: changeS4(props.margin)[0] || 0,
        marginRight: changeS4(props.margin)[1] || 0,
        marginBottom: changeS4(props.margin)[2] || 0,
        marginLeft: changeS4(props.margin)[3] || 0,
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
        fontSize: props.fontSize ? +props.fontSize * RTX : 32 * RTX,
        color: props.color || '#181818',
        fontWeight: props.fontWeight || 'normal',
      }}
    />
  ) 

}

interface TextareaProps extends InputProps{
  // autoHeight?: boolean
}
export const Textarea = (props: TextareaProps) => {
  const inputRef = useRef<TextInput>(null)
  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current?.blur()
    })  
    return () => {
      hideSubscription.remove();
    }
  }, [inputRef.current])

  return (
    <TextInput
      ref={inputRef}
      editable={!props.disabled || true}
      secureTextEntry={props.password || false}
      onChangeText={(text) => {
        props.onInput && props.onInput(text)
      }}
      value={props.value ? props.value.toString() : ''}
      placeholder={props.placeholder || '请输入内容'}
      placeholderTextColor={props.pColor || '#8c8c8c'}
      keyboardType={keyboardTypeMap[props.type || 'text']}
      maxLength={+(props.maxlength || '140') === -1 ? undefined : +(props.maxlength || '140')}
      // autoHeight={props.autoHeight || false}
      textAlignVertical='top'
      style={{
        width: props.size ? changeS2(props.size)[0] : '100%',
        height: props.size ? changeS2(props.size)[1] : 168 * RTX,
        paddingTop: changeS4(props.padding)[0] || 0,
        paddingRight: changeS4(props.padding)[1] || 0,
        paddingBottom: changeS4(props.padding)[2] || 0,
        paddingLeft: changeS4(props.padding)[3] || 0,
        marginTop: changeS4(props.margin)[0] || 0,
        marginRight: changeS4(props.margin)[1] || 0,
        marginBottom: changeS4(props.margin)[2] || 0,
        marginLeft: changeS4(props.margin)[3] || 0,
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
        fontSize: props.fontSize ? +props.fontSize * RTX : 32 * RTX,
        color: props.color || '#181818',
        fontWeight: props.fontWeight || 'normal',
      }}
    />
  )
}




/** 按钮 */
interface ButtonProps {
  loading?: boolean
  children?: ReactNode
  onClick?: Function
  fontSize?: TFontSize
  color?: TColor
  fontWeight?: TFontWeight
  isFixAnimate?: boolean
  disable?: boolean
  size?: TSize
  radius?: TRadius
  overflow?: TOverflow
  bgColor?: TColor
  borderColor?: TColor
  zIndex?: TZIndex
  opacity?: TOpacity
  margin?: TMargin
  letterSpacing?: string
}
export const Button = (props: ButtonProps) => {
  const {onClick=() => {},loading=false} = props
  return (
    <Btn
      style={{
        width: props.size ? changeS2(props.size)[0] : 300 * RTX,
        height: props.size ? changeS2(props.size)[1] : 80 * RTX,
        borderTopLeftRadius: changeS4(props.radius)[0] || 15 * RTX,
        borderTopRightRadius: changeS4(props.radius)[1] || 15 * RTX,
        borderBottomRightRadius: changeS4(props.radius)[2] || 15 * RTX,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 15 * RTX,
        borderWidth: props.borderColor ? 1 : 0,
        borderColor: props.borderColor ? `${props.borderColor}` : '',
        backgroundColor: props.disable ? '#b7b7b7' : (props.bgColor || '#1890ff'),
        zIndex: props.zIndex ? +props.zIndex : null,
        opacity: props.opacity ? +props.opacity : 1,
        marginTop: changeS4(props.margin)[0] || 0,
        marginRight: changeS4(props.margin)[1] || 0,
        marginBottom: changeS4(props.margin)[2] || 0,
        marginLeft: changeS4(props.margin)[3] || 0,
      }}
      onClick={(e) => {
        if(props.disable) return
        if(loading) return
        onClick(e)
      }}
    >
      {
        loading &&
        <Viw style={{paddingTop: sys.platform === 'ios' ? 5 : 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5}}>
          <ActivityIndicator color='#ffffff' animating={true} />
        </Viw>
      }
      {
        typeof(props.children) === 'string' ? (
          <Block>
            { (sys.platform === 'ios' && props.letterSpacing) && <Viw style={{height: 1, width: +(props.letterSpacing || '0') * RTX }}/> }
            <Txt 
              style={{
                fontSize: +(props.fontSize || 30) * RTX,
                color: props.disable ? '#f1f1f1' : (props.color || '#ffffff'),
                fontWeight: props.fontWeight || 'normal',
                letterSpacing: +(props.letterSpacing || '0') * RTX,
              }}
            >
              {props.children}
            </Txt>
          </Block>
        )
        :
        props.children
      }
    </Btn>
  )
}


interface SwiperProps{
  size?: TSize
  childList: ReactNode[]
  onChange?: Function
  current?: number
  autoplay?: boolean
  circular?: boolean
  vertical?: boolean
  radius?: TRadius
  padding?: TPadding
  bgColor?: TColor
  indicatorDots?: boolean
  indicatorColor?: TColor
  indicatorActiveColor?: TColor
}
export const Swiper = (props: SwiperProps) => (
  <Swi
    style={{
      width: props.size ? changeS2(props.size)[0] : '100%',
      height: props.size ? changeS2(props.size)[1] : '100%',
      paddingTop: changeS4(props.padding)[0] || 0,
      paddingRight: changeS4(props.padding)[1] || 0,
      paddingBottom: changeS4(props.padding)[2] || 0,
      paddingLeft: changeS4(props.padding)[3] || 0,
      borderTopLeftRadius: changeS4(props.radius)[0] || 0,
      borderTopRightRadius: changeS4(props.radius)[1] || 0,
      borderBottomRightRadius: changeS4(props.radius)[2] || 0,
      borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
      backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
      overflow: 'hidden',
    }}
    indicatorDots={props.indicatorDots || false}
    indicatorColor={props.indicatorColor || 'rgba(0, 0, 0, .3)'}
    indicatorActiveColor={props.indicatorActiveColor || '#000000'}
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
        <SwiI
          key={index + '1066'} 
          style={{
            width: '100%', 
            height: '100%',
          }}
        >
          {item}
        </SwiI>
      ))
    }
  </Swi>
)




interface SwitchProps {
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




interface ScrollViewProps {
  size?: TSize
  scrollX?: boolean
  scrollY?: boolean
  upperThreshold?: string | number
  lowerThreshold?: string | number
  scrollTop?: string | number
  scrollLeft?: string | number
  enableFlex?: boolean
  onScrollToUpper?: (event: any) => void
  onScrollToLower?: (event: any) => void
  onScroll?: (event: any) => void
  children?: ReactNode
  radius?: TRadius
  padding?: TPadding
  bgColor?: TColor
  scrollWithAnimation?: boolean
  showsVerticalScrollIndicator?: boolean
  showsHorizontalScrollIndicator?: boolean
}
export const ScrollView = (props: ScrollViewProps) => {
  const {
    scrollX, scrollY, upperThreshold='50', lowerThreshold='50',
    scrollTop, scrollLeft, enableFlex, 
    onScrollToUpper=()=>{}, onScrollToLower=()=>{},
    onScroll=()=>{}, children, scrollWithAnimation,
    showsVerticalScrollIndicator, showsHorizontalScrollIndicator
  } = props
  return (
    <ScV 
      style={{
        width: props.size ? changeS2(props.size)[0] : '100%',
        height: props.size ? changeS2(props.size)[1] : '100%',
        paddingTop: changeS4(props.padding)[0] || 0,
        paddingRight: changeS4(props.padding)[1] || 0,
        paddingBottom: changeS4(props.padding)[2] || 0,
        paddingLeft: changeS4(props.padding)[3] || 0,
        borderTopLeftRadius: changeS4(props.radius)[0] || 0,
        borderTopRightRadius: changeS4(props.radius)[1] || 0,
        borderBottomRightRadius: changeS4(props.radius)[2] || 0,
        borderBottomLeftRadius: changeS4(props.radius)[2] || 0,
        overflow: 'hidden',
        backgroundColor: props.bgColor || 'rgba(0,0,0,0)',
      }}
      scrollX={scrollX || false}
      scrollY={scrollY || false}
      upperThreshold={+upperThreshold}
      lowerThreshold={+lowerThreshold}
      scrollTop={scrollTop ? +scrollTop * RTX : undefined}
      scrollLeft={scrollLeft ? +scrollLeft * RTX : undefined}
      onScrollToUpper={onScrollToUpper}
      onScrollToLower={onScrollToLower}
      onScroll={onScroll}
      scrollWithAnimation={scrollWithAnimation || true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator || false}
    >
      {children}
    </ScV>
  )
}

