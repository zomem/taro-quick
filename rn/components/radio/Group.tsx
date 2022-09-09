/*
 * @Author: zomem 770552117@qq.com
 * @Date: 2022-04-21 17:18:07
 * @LastEditors: zomem 770552117@qq.com
 * @LastEditTime: 2022-06-01 08:57:39
 * @FilePath: /taro-quick-rn/src/radio/Group.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {ReactNode} from "react"
import {Flex, Box, Block} from '../Components'

export interface GroupProps {
  /** 横向显示，还是纵向 */
  type?: 'row' | 'col' | 'wrap'
  /** 大小 */
  size?: string
  value?: string | number
  onChange?: Function
  children: ReactNode
  /** 是否禁用 */
  disable?: boolean

  /** 选项字体颜色 */
  color?: string 
  /** 选项字体大小 */
  fontSize?: string
  /** 选项按钮，未选中 */
  Icon?: ReactNode
  /** 选项按钮，已选中 */
  IconSelect?: ReactNode
  justifyContent?: 'center' | 'space-between' | 'space-around' | 'flex-end' | 'flex-start'
}

const Group = ({onChange=()=>{}, children, disable=false, value, type='row', size='100% auto', color='#060606', fontSize='32', Icon, IconSelect, justifyContent='flex-start'}: GroupProps) => (
  <Block>
    {
      type === 'wrap' ? 
      <Box flexWrap='wrap' display='flex' justifyContent={justifyContent}>
        {
          React.Children.map(children, (child) => {
            if(React.isValidElement(child)){
              return React.cloneElement(child, {onChange, select: value, type, disable, color, fontSize, Icon, IconSelect})
            }
            throw new Error('Radio.Group 的子组件必须是 React.ReactElement 类型')
          })
        }
      </Box>
      :
      <Flex flex={type === 'row' ? 'frbc' : 'fcbs'} size={size}>
        {
          React.Children.map(children, (child) => {
            if(React.isValidElement(child)){
              return React.cloneElement(child, {onChange, select: value, type, disable, color, fontSize, Icon, IconSelect})
            }
            throw new Error('Radio.Group 的子组件必须是 React.ReactElement 类型')
          })
        }
      </Flex>
    }
  </Block>
)

export default Group