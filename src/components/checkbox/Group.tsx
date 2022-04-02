import React, {} from 'react'
import {Flex} from '../Components'

export interface GroupProps {
  /** 横向显示，还是纵向 */
  type?: 'row' | 'col'
  size?: string
  values?: (string | number)[]
  onChange?: Function
  children: React.ReactNode
}

const Group: React.FC<GroupProps> = ({
  onChange=()=>{}, children, values, type='row', size='100% auto'
}) => (
  <Flex flex={type === 'row' ? 'frbc' : 'fcbs'} size={size}>
    {
      React.Children.map(children, (child) => {
        if(React.isValidElement(child)){
          return React.cloneElement(child, {onChange: onChange, selectList: values, type: type})
        }
        throw new Error('Radio.Group 的子组件必须是 React.ReactElement 类型')
      })
    }
  </Flex>
)

export default Group