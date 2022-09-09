/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-03 14:03:34
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-03 14:44:23
 * @FilePath: /taro-quick/src/rn/CatLine.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Block, Flex, Text, Press, ScrollView} from './Components'

interface ListItem {
  id?: number
  title?: string
}
interface ChangeTab {
  list: ListItem[]
  current?: number
  onChange?: Function
  isScroll?: boolean
  itemWidth?: string

  fontSize?: string
  color?: string
  selectColor?: string
  bgColor?: string
}

const CatLine = (props: ChangeTab) => {
  const {list, bgColor='#ffffff', current=0, onChange=() => {}, isScroll=false, itemWidth, fontSize='32', selectColor='#1890ff', color='#060606'} = props

  
  return (
    <Block>
      {
        !isScroll ?
        <Flex size='100% 86' flex='frac' bgColor={bgColor}>
          {
            list.length > 0 &&
            list.map((item, index) => (
              <Press onClick={() => {onChange(index)}} key={item.id}>
                <Flex size='auto 86' padding='0 25' flex='frcc'>
                  {
                    current === index ?
                    <Text fontSize={fontSize} color={selectColor} >{item.title}</Text>
                    :
                    <Text fontSize={fontSize} color={color}>{item.title}</Text>
                  }
                </Flex>
              </Press>
            ))
          }
        </Flex>
        :
        <ScrollView scrollX scrollLeft={itemWidth ? ((current - 1) * (+itemWidth + 50)) : undefined} size='100% 86' bgColor={bgColor} padding='0 20' scrollWithAnimation>
          {
            list.length > 0 &&
            list.map((item, index) => (
              <Press onClick={() => {onChange(index)}} key={item.id}>
                <Flex flex='frcc' size={`${itemWidth || '100%'} 86`} margin='0 25'>
                  {
                    current === index ?
                    <Text fontSize={fontSize} color={selectColor} >{item.title}</Text>
                    :
                    <Text fontSize={fontSize} color={color} >{item.title}</Text>
                  }
                </Flex>
              </Press>
            ))
          }
        </ScrollView>
      }
    </Block>
  )
}

export default CatLine