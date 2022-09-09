import { 
  Block, Box, SafeArea, Press, Flex, Line, Text,
  TextEllipsis, Image, Input, Textarea, Button,
  Swiper, Switch, ScrollView, Animate,

  TFontWeight, TOverflow, TDisplay,
  TFlexWay, TBoxSizing, TPosition, TBgImageType, TSafeType, 
  TTextDecoration, TFlexWrap, TFontStyle, TWhiteSpace, TPointerEvents,
  TStroke, TWordBreak, TFlexShrink, TaroQuickAnimate as IAnimate
} from './components/Components'
import Page from './components/Page'
import Modal from './components/Modal'
import Drawer from './components/Drawer'
import Checkbox from './components/checkbox/Checkbox'
import Radio from './components/radio/Radio'
import Highlight from './components/Highlight'
import Tabs from './components/tabs/Tabs'
import Search from './components/Search'
import Tag from './components/Tag'
import Table, {Column as IColumn} from './components/table/Table'
import UploadImage from './components/UploadImage'


export {
  Block, Box, Flex, Line, Text, TextEllipsis,
  Image, SafeArea, Input, Press, Textarea, Button,
  Switch, Swiper, ScrollView, Animate, Page,
  Modal, Drawer, Checkbox, Radio, Highlight,
  Tabs, Search, Tag, Table, UploadImage
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
export type WhiteSpace = TWhiteSpace
export type PointerEvents = TPointerEvents
export type Stroke = TStroke
export type WordBreak = TWordBreak
export type FlexShrink = TFlexShrink

export interface Column extends IColumn {}
export interface TaroQuickAnimate extends IAnimate {}

