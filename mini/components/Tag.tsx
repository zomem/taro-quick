import React from 'react'
import {Flex, Block, Box} from './Components'


type TagPresets = 'magenta' | 'red' | 'volcano' | 'orange' | 'gold' | 
'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple'

interface TagProps {
  /** 当为 custom 时，用户自定义背景色，，但文字颜色为固定白色 */
  type?: 'custom' | TagPresets
  /** 标签的自定义背景颜色 */
  bgColor?: string
  /** 圆角度 */
  radius?: string
  /** tag 的 margin */
  margin?: string
  /** 标签内容 */
  children?: React.ReactNode
}


const presets = {
  magenta: {color: '#c41d7f', background: '#fff0f6', borderColor: '#ffadd2'},
  red: {color: '#cf1322', background: '#fff1f0', borderColor: '#ffa39e'},
  volcano: {color: '#d4380d', background: '#fff2e8', borderColor: '#ffbb96'},
  orange: {color: '#d46b08', background: '#fff7e6', borderColor: '#ffd591'},
  gold: {color: '#d48806', background: '#fffbe6', borderColor: '#ffe58f'},
  lime: {color: '#7cb305', background: '#fcffe6', borderColor: '#eaff8f'},
  green: {color: '#389e0d', background: '#f6ffed', borderColor: '#b7eb8f'},
  cyan: {color: '#08979c', background: '#e6fffb', borderColor: '#87e8de'},
  blue: {color: '#096dd9', background: '#e6f7ff', borderColor: '#91d5ff'},
  geekblue: {color: '#1d39c4', background: '#f0f5ff', borderColor: '#adc6ff'},
  purple: {color: '#531dab', background: '#f9f0ff', borderColor: '#d3adf7'},
}

const Tag = ({bgColor='#bdbdbd', margin='0 12 0 0', children, type='custom', radius='10'}: TagProps) => {

  return (
    <Block>
      {
        type === 'custom' ?
        <Box size='auto auto' display='inline-block'>
          <Flex flex='frcc' bgColor={bgColor} padding='3 8' radius={radius} fontSize='22' color='#ffffff' margin={margin}>
            {children}
          </Flex>
        </Box>
        :
        <Box size='auto auto' display='inline-block'>
          <Flex flex='frcc' borderColor={presets[type].borderColor} color={presets[type].color} bgColor={presets[type].background} padding='3 8' radius={radius} fontSize='22' margin={margin}>
            {children}
          </Flex>
        </Box>
      }
    </Block>
  )
}

export default Tag