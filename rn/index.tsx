/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-03 14:03:34
 * @LastEditors: zomem 770552117@qq.com
 * @LastEditTime: 2022-06-04 15:30:09
 * @FilePath: /taro-quick/src/rn/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { 
  Block, Box, SafeArea, Press, Flex, Line, Text,
  TextEllipsis, Image, Input, Textarea, Button,
  Swiper, Switch, ScrollView, BoxImg,

  TFontWeight, TOverflow, TDisplay,
  TFlexWay, TBoxSizing, TPosition, TBgImageType, TSafeType, 
  TTextDecoration, TFlexWrap, TFontStyle, TPointerEvents,
  TStroke
} from './components/Components'
import Page from './components/Page'
import Modal from './components/Modal'
// import Drawer from './Drawer'
import Checkbox from './components/checkbox/Checkbox'
import Radio from './components/radio/Radio'
import Highlight from './components/Highlight'
import Tabs from './components/tabs/Tabs'
// import Search from './Search'
import Tag from './components/Tag'
import Table, {Column as IColumn} from './components/table/Table'
import Loading from './components/Loading'
import CatLine from './components/CatLine'
import useNavTabInfo from './hooks/useNavTabInfo'

import { RTX } from './constants/constants'


export {
  Block, Box, Flex, Line, Text, TextEllipsis,
  Image, SafeArea, Input, Press, Textarea, Button,
  Switch, Swiper, ScrollView, Page,
  Modal, Checkbox, Radio, Highlight,
  Tabs, Tag, Table, Loading, CatLine, BoxImg,
  useNavTabInfo, RTX
}



export type FontWeight = TFontWeight
export type Overflow = TOverflow
export type Display = TDisplay
export type FlexWay = TFlexWay
export type BoxSizing = TBoxSizing
export type Position = TPosition
export type BgImageType = TBgImageType
export type SafeType = TSafeType
export type TextDecoration = TTextDecoration
export type FlexWrap = TFlexWrap
export type FontStyle = TFontStyle
export type PointerEvents = TPointerEvents
export type Stroke = TStroke

export interface Column extends IColumn {}