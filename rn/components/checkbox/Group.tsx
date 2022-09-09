/*
 * @Author: zomem 770552117@qq.com
 * @Date: 2022-04-21 17:18:07
 * @LastEditors: zomem 770552117@qq.com
 * @LastEditTime: 2022-06-01 08:57:23
 * @FilePath: /taro-quick-rn/src/checkbox/Group.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {ReactNode} from 'react'
import {Flex, Box, Block} from '../Components'

export interface GroupProps {
  /** 横向显示，还是纵向 */
  type?: 'row' | 'col' | 'wrap'
  size?: string
  values?: (string | number)[]
  onChange?: Function
  children: React.ReactNode
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

const Group = ({
  onChange=()=>{}, children, values, type='row', size='100% auto',
  color='#060606', fontSize='32', disable=false, justifyContent='flex-start',
  Icon, IconSelect
}: GroupProps) => (
  <Block>
    {
      type === 'wrap' ? 
      <Box flexWrap='wrap' display='flex' justifyContent={justifyContent}>
        {
          React.Children.map(children, (child) => {
            if(React.isValidElement(child)){
              return React.cloneElement(child, {onChange, selectList: values, type, disable, color, fontSize, Icon, IconSelect})
            }
            throw new Error('Checkbox.Group 的子组件必须是 React.ReactElement 类型')
          })
        }
      </Box>
      :
      <Flex flex={type === 'row' ? 'frbc' : 'fcbs'} size={size}>
      {
        React.Children.map(children, (child) => {
          if(React.isValidElement(child)){
            return React.cloneElement(child, {onChange, selectList: values, type, disable, color, fontSize, Icon, IconSelect})
          }
          throw new Error('Checkbox.Group 的子组件必须是 React.ReactElement 类型')
        })
      }
    </Flex>
    }
  </Block>
)

export default Group