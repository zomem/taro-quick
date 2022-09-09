import React, {ReactNode} from "react"
import {Flex} from '../Components'

export interface GroupProps {
  /** 横向显示，还是纵向 */
  type?: 'row' | 'col'
  /** 大小 */
  size?: string
  value?: string | number
  onChange?: Function
  children: ReactNode

  /** 选项字体颜色 */
  color?: string 
  /** 选项字体大小 */
  fontSize?: string
  /** 选项按钮，未选中 */
  Icon?: ReactNode
  /** 选项按钮，已选中 */
  IconSelect?: ReactNode
  /** itemMinHeight  每个项的最小高度 */
  itemMinHeight?: string
}

const Group = ({onChange=()=>{}, children, value, type='row', size='100% auto', color='#060606', fontSize='32', Icon, IconSelect, itemMinHeight}: GroupProps) => (
  <Flex flex={type === 'row' ? 'frbc' : 'fcbs'} size={size}>
    {
      React.Children.map(children, (child) => {
        if(React.isValidElement(child)){
          return React.cloneElement(child, {onChange, select: value, type, color, fontSize, Icon, IconSelect, itemMinHeight})
        }
        throw new Error('Radio.Group 的子组件必须是 React.ReactElement 类型')
      })
    }
  </Flex>
)

export default Group