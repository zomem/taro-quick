import React, {FC, ReactNode} from "react"
import {Flex} from '../Components'

export interface GroupProps {
  /** 横向显示，还是纵向 */
  type?: 'row' | 'col'
  /** 大小 */
  size?: string
  value?: string | number
  onChange?: Function
  children: ReactNode
}

const Group: FC<GroupProps> = ({onChange=()=>{}, children, value, type='row', size='100% auto'}) => (
  <Flex flex={type === 'row' ? 'frbc' : 'fcbs'} size={size}>
    {
      React.Children.map(children, (child) => {
        if(React.isValidElement(child)){
          return React.cloneElement(child, {onChange: onChange, select: value, type: type})
        }
        throw new Error('Radio.Group 的子组件必须是 React.ReactElement 类型')
      })
    }
  </Flex>
)

export default Group