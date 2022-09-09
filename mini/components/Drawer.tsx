import {ReactNode, useState, useEffect, FC} from 'react'
import Taro from '@tarojs/taro'

import {Flex, Block, Animate, TaroQuickAnimate} from './Components'

import './widget.css'


const animation = Taro.createAnimation({
  transformOrigin: "50% 50%",
  duration: 430,
  timingFunction: 'ease',
  delay: 0
})


interface Drawer {
  children?: ReactNode
  isShow?: boolean
  height?: string
  onCancel?: () => void
  padding?: string
  /** 是否显示右上角的取消按钮 */
  showCancel?: boolean
  /** 面板下面的透明黑色背景颜色 */
  backBgColor?: string
  /** 面板颜色 */
  bgColor?: string

  /** 取消按钮的icon, react组件 */
  IconCancel?: ReactNode
}

const Drawer = (props: Drawer) => {
  const {windowHeight, windowWidth} = Taro.getSystemInfoSync()
  const rtx = 750 / windowWidth
  
  const {isShow, children, onCancel=()=>{}, height='auto', padding='25', showCancel=false, bgColor='rgba(255,255,255,0.89)', backBgColor='rgba(0, 0, 0, 0.45)', IconCancel} = props
  const [animate, setAnimate] = useState<{back: TaroQuickAnimate; box: TaroQuickAnimate}>({
    back: {actions: []},
    box: {actions: []}
  })
  const [size, setSize] = useState('0 0')

  useEffect(() => {
    if(isShow) {
      setSize(`750 ${windowHeight * rtx}`)
      setAnimate({
        back: animation.opacity(1).step().export(),
        box: animation.bottom(0).step().export()
      })
    }else{
      setAnimate({
        back: animation.opacity(0).step().export(),
        box: animation.bottom(-600).step().export()
      })
      setTimeout(() => {
        setSize('0 0')
      }, 430)
    }
  }, [isShow, height])


  return (
    <Block>
      <Animate onClick={onCancel} bgColor={backBgColor} size={size} animation={animate.back} position='fixed' top='0' left='0' zIndex='500'>
        <Animate
          className='_backdrop_filter'
          backdrop='20'
          padding={padding}
          animation={animate.box}
          position='absolute'
          left='0'
          bottom='0'
          size={`100% ${height}`}
          bgColor={bgColor}
          radius='28 28 0 0'
          onClick={(e) => {e.stopPropagation()}}
          minHeight='100'
        >
          {
            showCancel &&
            <Flex onClick={onCancel} flex='fres' size='80 80' position='absolute' top='25' right='25'>
              {IconCancel}
            </Flex>
          }
          {children}
        </Animate>
      </Animate>
    </Block>
  )

}


export default Drawer