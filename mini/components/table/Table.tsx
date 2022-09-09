import React, { memo, useMemo, useState, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import VirtualList from '@tarojs/components/virtual-list'
import {Progress} from '@tarojs/components'

import {Block, Box, Flex, Line, Text, ScrollView, TextEllipsis, Press, Animate, TFlexWay, TaroQuickAnimate} from '../Components'
import {ZPX} from '../../constants/constants'

import {getCloumnsItemByKey, reOrderDataSource, sortBy, getScreenData, screenBy, DEFAULT_HEIGHT, DEFAULT_WIDTH} from './utils'

import TablePop from './TablePop'


const rtx = 750 / Taro.getSystemInfoSync().windowWidth

export interface Column {
  title: string
  dataIndex: string
  /** 是否启用排序 */
  sort?: boolean
  /** 是否启用筛选 */
  screen?: boolean
  /** 
   * 自定义渲染组件, text为当前的值，record为当前行的值，index为当前索引
   * @example
   *  render: (text, record, index) => {
   *    return (
   *      <Text color=‘#f2aaad’ fontWeight='bold'>{text||'0'}</Text>
   *    )
   *  }
   */
  render?: any
  /** 列表的宽度，当 scrollX为false 时，用%设置，且每个列都要设置%，，反之，请用数字 */
  width?: string
  /** 列表格的对其方式 同 Flex 一样 */
  flex?: TFlexWay
  /** 列表的颜色，半透明 */
  columnBgColor?: string
  /** 列表里面，字显示多少行后，进行省略 */
  textLine?: string
}

interface TableProps {
  /** 表的ID，唯一 */
  id: string
  /** 列表格式 */
  columns: Column[]
  /** 数据源 */
  dataSource: any
  /** x轴 是否可以滚动 */
  scrollX?: boolean
  /** 选择的行，的背景色，rgba透明的 */
  selectLineColor?: string
  /** 表格主题色 */
  themeColor?: string
  /** 标题栏，背景色 */
  titleBgColor?: string
  /** 使用 Taro.nextTick 确保本次 setState 不会和首次渲染合并更新，优化加载 */
  mounted?: boolean
  /** 行高，设置后，列表高度将固定。开启虚拟化时，这个为必填 */
  rowHeight?: string
  /** 虚拟化表格的尺寸, 值必须为具体数值，如：'750 600'，当 virtualSize 有值时，表示启用虚拟化表格功能，且 rowHeight 此时必须有具体的值 */
  virtualSize?: string
  /** 普通表格的尺寸（默认为 '100% 100%'）。如果设置了 virtualSize，则 size 将不生效 */
  size?: string
  /** 虚拟列表的  预加载列数 默认为1行 */
  overscanCount?: string
  /** table 的圆角 */
  radius?: string


  /** 排序箭头，未激活 */
  IconSort?: React.ReactNode
  /** 排序箭头，激活 */
  IconSortActive?: React.ReactNode
  /** 筛选，未激活 */
  IconScreen?: React.ReactNode
  /** 筛选，激活 */
  IconScreenActive?: React.ReactNode
  /** 复选框，未激活 */
  IconSelect?: React.ReactNode
  /** 复选框，激活 */
  IconSelectActive?: React.ReactNode
  /** 表格里面的字体大小 */
  fontSize?: string
  /** 表格里面的字体颜色 */
  color?: string
  /** 部分点击时的，hover效果 */
  hoverColor?: string
  /** 表格标题分栏的线条颜色, 和进度条底色 */
  lineColor?: string
  /** 行分隔颜色，浅色 */
  rowBgColorLight?: string
  /** 行分隔颜色，深色 */
  rowBgColor?: string
  /** 是否正在加载 */
  loading?: boolean
}






const itemAnimate = Taro.createAnimation({
  transformOrigin: "50% 50%",
  timingFunction: "linear",
  duration: 120,
})
const sortArrAnimate = Taro.createAnimation({
  transformOrigin: "50% 50%",
  timingFunction: "linear",
  duration: 360
})


const Table = ({
  dataSource, id, columns, scrollX=false, selectLineColor='rgba(255, 195, 0, 0.19)', 
  themeColor='#1890ff', titleBgColor='rgba(255, 255 ,255 ,0.89)', mounted=true, rowHeight, virtualSize, overscanCount='1', radius='0',
  IconSort, IconScreen, IconSortActive, IconScreenActive, fontSize='32', color='#060606', hoverColor='#f2f2f2', lineColor='#ededed',
  rowBgColor='#ffffff', rowBgColorLight='#f5f5f5', IconSelect, IconSelectActive, size='100% 100%', loading
}: TableProps) => {

  const [percent, setPercent] = useState(30)  // 加载中，动画

  const [newDataSource, setNewDataSource] = useState<any>([{}])
  const [selectItem, setSelectItem] = useState<{row: number; col: string; animate: TaroQuickAnimate; animateOff: TaroQuickAnimate}>({row: -1, col: '', animate: {actions: []}, animateOff: {actions: []}})  // 行index, 列 dataIndex

  const [sortColumn, setSortColumn] = useState<{colKey: string; sortBy: -1 | 0 | 1; animate: TaroQuickAnimate; colAnimate: TaroQuickAnimate; colAnimateOff: TaroQuickAnimate;}>({
    colKey: '',
    sortBy: 0,  // -1 为降序排列，， 0 为不排列，， 1 为升序排列
    animate: {actions: []},
    colAnimate: {actions: []},
    colAnimateOff: {actions: []},
  })
  const [showScreen, setShowScreen] = useState<{show: 1 | 0 | -1; left: string; top: string; width: string; selectKey: string | number;}>({
    selectKey: '',
    show: 0,
    left: '0',
    top: '80',
    width: DEFAULT_WIDTH,
  })  // 是否显示筛选的面板

  // 将筛选的数据列出来
  const [screenData, setScreenData] = useState<{[key: string]: any;}>({})

  // 列的背景动画, 用于筛选
  const columnAnimate = useMemo<{columnAnimate: TaroQuickAnimate; columnAnimateOff: TaroQuickAnimate}>(() => {
    return {
      columnAnimate: itemAnimate.backgroundColor(selectLineColor).step().export(),
      columnAnimateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
    }
  }, [])


  useEffect(() => {
    setPercent(100)
  }, [mounted])
  

  useEffect(() => {
    setNewDataSource(reOrderDataSource(dataSource, columns))
    setScreenData(getScreenData(dataSource, columns))
  }, [columns, dataSource])

  const dataSourceBackup = useMemo(() => {
    return reOrderDataSource(dataSource, columns)
  }, [columns, dataSource])


  /**
   * 排序变化
   */
  const onSortColumn = useCallback((col: string) => {
    if(col !== sortColumn.colKey && sortColumn.colKey){
      setSortColumn({
        colKey: col,
        sortBy: -1,
        animate: {actions: []},
        colAnimate: itemAnimate.backgroundColor(selectLineColor).step().export(),
        colAnimateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
      })
    }else{
      switch(sortColumn.sortBy) {
        case 0:
          setSortColumn({
            colKey: col,
            sortBy: -1,
            animate: {actions: []},
            colAnimate: itemAnimate.backgroundColor(selectLineColor).step().export(),
            colAnimateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
          })
          return
        case -1:
          setSortColumn({
            colKey: col,
            sortBy: 1,
            animate: sortArrAnimate.rotate(180).step().export(),
            colAnimate: itemAnimate.backgroundColor(selectLineColor).step().export(),
            colAnimateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
          })
          return
        case 1:
          setSortColumn(prev => ({
            ...prev,
            animate: sortArrAnimate.rotate(0).step().export(),
            colAnimate: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
            colAnimateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
          }))
          setTimeout(() => {
            setSortColumn(prev => ({
              ...prev,
              colKey: '',
              sortBy: 0,  // -1 为降序排列，， 0 为不排列，， 1 为升序排列
            }))
          }, 300)
          return
        default:
          return
      }
    }
  }, [sortColumn.sortBy, sortColumn.colKey, selectLineColor, themeColor])


  /**
   * 筛选变化
   */
  // 筛选按钮的点击回调
  const screenClick = useCallback((item, index, type) => {
    // onScreenColumn(item.dataIndex)
    
    if(showScreen.show === 1){
      setShowScreen(prev => ({
        ...prev,
        show: 0,
      }))
    }else{
      let leftDis = 0
      for(let i = 0; i < columns.length; i++){
        if(i < index){
          leftDis += parseInt(columns[i].width || DEFAULT_WIDTH)
        }
      }
      if(virtualSize){
        setShowScreen(prev => ({
          ...prev,
          selectKey: item.dataIndex,
          show: 1,
          left: `${((leftDis / 100) * (+(virtualSize.split(' ')[0]))) >>> 0}`,
          top: virtualSize.split(' ')[1],
          width: item.width || DEFAULT_WIDTH
        }))
      }else{
        const query = Taro.createSelectorQuery()
        query.select('#' + id).scrollOffset()
        query.exec(function(res){
          if(res[0]){
            setShowScreen(prev => ({
              ...prev,
              selectKey: item.dataIndex,
              show: 1,
              left: type === 1 ? `${leftDis}` : `${((leftDis / 100) * (res[0].scrollWidth * rtx)) >>> 0}`,
              // top: `${(res[0].scrollTop * rtx + 80) >>> 0}`,
              width: item.width || DEFAULT_WIDTH
            }))
          }
        })
      }
    }
  }, [showScreen.show, columns, id, virtualSize])

  // 执行 排序 和 筛选
  useEffect(() => {
    if(showScreen.show !== 1){
      let tempChange: any[] = []
      // 先执行排序
      if(sortColumn.sortBy === 0){
        tempChange = dataSourceBackup
      }else{
        tempChange = sortBy(dataSourceBackup, sortColumn.colKey, sortColumn.sortBy)
      }
      // 再进行筛选
      for(let skey in screenData){
        if(skey[0] === '_' && screenData[skey].length > 0){
          tempChange = screenBy(tempChange, skey.substring(1), screenData[skey])
        }
      }
      
      setNewDataSource(tempChange)
      setPercent(100)
    }
  }, [screenData, sortColumn.sortBy, sortColumn.colKey, dataSourceBackup, showScreen.show])



  // 标题栏
  const RowTitle = (
    <Block>
      {
        (scrollX && !virtualSize) ?
        <Box position='sticky' top='0' left='0' zIndex='10'>
          <Box
            size={`${newDataSource[0]['_column_row_width']} ${rowHeight || DEFAULT_HEIGHT}`}
            display='flex'
            flexWrap='nowrap'
            bgColor={titleBgColor}
            backdrop='20'
          >
            {
              columns.map((item, index) => (
                <Flex flex='frbc' key={item.dataIndex} size={`${item.width || DEFAULT_WIDTH} 100%`}>
                  <Line size='1 40' />
                  <Animate 
                    animation={(() => {
                      if(item.sort){
                        if(sortColumn.colKey === item.dataIndex) return sortColumn.colAnimate 
                        return sortColumn.colAnimateOff
                      }
                      if(item.screen){
                        if(screenData['_' + item.dataIndex]?.length > 0) return columnAnimate.columnAnimate
                        return columnAnimate.columnAnimateOff
                      }
                      return {actions: []}
                    })()}
                    size={`100% 100%`}
                  >
                    <Flex 
                      size={`100% 100%`}
                      flex={item.flex || 'frcc'}
                      bgColor={item.columnBgColor || ''}
                      padding='15 8 15 8'
                    >
                    {
                      item.sort ?
                      <Press
                        size={`auto 100%`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if(showScreen.show === 1){
                            setShowScreen(prev => ({
                              ...prev,
                              show: 0
                            }))
                          }else{
                            onSortColumn(item.dataIndex)
                          }
                        }}
                      >
                        <Flex flex='frcc' size={`auto 100%`}>
                          <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                          <Flex size='42 50' flex='frcc'>
                            {
                              sortColumn.colKey === item.dataIndex ?
                              <Animate animation={sortColumn.animate}>
                                {IconSortActive}
                              </Animate>
                              :
                              IconSort
                            }
                          </Flex>
                        </Flex>
                      </Press>
                      :
                      item.screen ?
                      <Press
                        size={`auto 100%`}
                        onClick={(e) => {
                          e.stopPropagation()
                          screenClick(item, index, 1)
                          setPercent(0)
                        }}
                      >
                        <Flex flex='frcc' size={`auto 100%`}>
                          <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                          <Flex size='46 50' flex='frcc'>
                            {
                              screenData['_' + item.dataIndex]?.length > 0 ? 
                              IconScreenActive
                              :
                              IconScreen
                            }
                          </Flex>
                        </Flex>
                      </Press>
                      :
                      <Press
                        size={`auto 100%`}
                        hoverBgColor={hoverColor}
                        onClick={(e) => {
                          e.stopPropagation()
                          if(showScreen.show === 1){
                            setShowScreen(prev => ({
                              ...prev,
                              show: 0
                            }))
                          }
                        }}
                      >
                        <Flex flex='frcc' size={`auto 100%`}>
                          <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                        </Flex>
                      </Press>
                    }
                    </Flex>
                  </Animate>
                  <Line size='1 40' bgColor={index < columns.length - 1 ? themeColor : ''} />
                </Flex>
              ))
            }
          </Box>
          <Progress style={{width: `${newDataSource[0]['_column_row_width']}${ZPX}`}} percent={percent} duration={0.5} active strokeWidth={'1'+ZPX} activeColor={themeColor} backgroundColor={lineColor} />
        </Box>
        :
        <Box size='100% auto' position={virtualSize ? 'absolute' : 'sticky'} top='0' left='0' zIndex='10'>
          <Box 
            size={`100% ${rowHeight || DEFAULT_HEIGHT}`}
            display='flex'
            flexWrap='nowrap'
            bgColor={titleBgColor}
            backdrop='20'
          >
            {
              columns.map((item, index) => (
                <Flex flex='frbc' key={item.dataIndex} size={`${item.width || 'auto'} 100%`}>
                  <Line size='1 40' />
                  <Animate
                    animation={(() => {
                      if(item.sort){
                        if(sortColumn.colKey === item.dataIndex) return sortColumn.colAnimate 
                        return sortColumn.colAnimateOff
                      }
                      if(item.screen){
                        if(screenData['_' + item.dataIndex]?.length > 0) return columnAnimate.columnAnimate
                        return columnAnimate.columnAnimateOff
                      }
                      return {actions: []}
                    })()}
                    size={`100% 100%`}
                  >
                  {
                    item.sort ?
                    <Press
                      size={`100% 100%`}
                      onClick={(e) => {
                        e.stopPropagation()
                        if(showScreen.show === 1){
                          setShowScreen(prev => ({
                            ...prev,
                            show: 0
                          }))
                        }else{
                          onSortColumn(item.dataIndex)
                        }
                      }}
                    >
                      <Flex size={`100% 100%`} flex={item.flex || 'frcc'} bgColor={item.columnBgColor || ''} padding='15 8 15 8' >
                        <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                        <Flex size='42 50' flex='frcc'>
                          {
                            sortColumn.colKey === item.dataIndex ?
                            <Animate animation={sortColumn.animate}>
                              {IconSortActive}
                            </Animate>
                            :
                            IconSort
                          }
                        </Flex>
                      </Flex>
                    </Press>
                    :
                    item.screen ?
                    <Press
                      size={`100% 100%`}
                      onClick={(e) => {
                        e.stopPropagation()
                        screenClick(item, index, 2)
                        setPercent(0)
                      }}
                    >
                      <Flex flex='frcc' size={`auto 100%`}>
                        <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                        <Flex size='46 50' flex='frcc'>
                          {
                            screenData['_' + item.dataIndex]?.length > 0 ? 
                            IconScreenActive
                            :
                            IconScreen
                          }
                        </Flex>
                      </Flex>
                    </Press>
                    :
                    <Press
                      size={`100% 100%`}
                      hoverBgColor={hoverColor}
                      onClick={(e) => {
                        e.stopPropagation()
                        if(showScreen.show === 1){
                          setShowScreen(prev => ({
                            ...prev,
                            show: 0
                          }))
                        }
                      }}
                    >
                      <Flex size={`100% 100%`} flex={item.flex || 'frcc'} bgColor={item.columnBgColor || ''} padding='15 8 15 8' >
                        <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                      </Flex>
                    </Press>
                  }
                  </Animate>
                  <Line size='1 40' bgColor={index < columns.length - 1 ? themeColor : ''} />
                </Flex>
              ))
            }
          </Box>
          <Progress style={{width: '100%'}} percent={percent} duration={0.5} active strokeWidth={'1rpx'} activeColor={themeColor} backgroundColor={lineColor} />
        </Box>
      }
    </Block>
  )

  // 行数据
  const RowData = (
    <Block>
      {
        scrollX ?
        newDataSource.map((item, index) => (
          <Box 
            size={`${item['_column_row_width']} ${rowHeight || 'auto'}`}
            key={index}
            display='flex'
            flexWrap='nowrap'
            minHeight={DEFAULT_HEIGHT}
            bgColor={index % 2 === 0 ? rowBgColorLight : rowBgColor}
          >
            {
              Object.entries(item).map(([key, value]: any) => {
                if(key.includes('_column_')) return null
                const tempColumn = getCloumnsItemByKey(columns, key)
                return (
                  <Animate 
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation()
                      // 隐藏筛选面板
                      if(showScreen.show === 1){
                        setShowScreen(prev => ({
                          ...prev,
                          show: 0
                        }))
                      }else{
                        if(selectItem.row === index){
                          setSelectItem({
                            row: -1,
                            col: '',
                            animate: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
                            animateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
                          })
                        }else{
                          setSelectItem({
                            row: index,
                            col: key,
                            animate: itemAnimate.backgroundColor(selectLineColor).step().export(),
                            animateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
                          })
                        }
                      }
                    }}
                    size={`${tempColumn.width || DEFAULT_WIDTH} auto`}
                    bgColor={tempColumn.columnBgColor || ''}
                    animation={
                      (() => {
                        if(tempColumn.sort){
                          if(sortColumn.colKey === tempColumn.dataIndex) return sortColumn.colAnimate 
                          return sortColumn.colAnimateOff
                        }
                        if(tempColumn.screen){
                          if(screenData['_' + tempColumn.dataIndex]?.length > 0) return columnAnimate.columnAnimate
                          return columnAnimate.columnAnimateOff
                        }
                        return {actions: []}
                      })()
                    }
                  >
                    <Animate 
                      animation={(selectItem.row === index) ? selectItem.animate : selectItem.animateOff}
                      size='100% 100%'
                    >
                      <Flex 
                        size='100% 100%'
                        flex={tempColumn.flex || 'frcc'}
                        padding='15 8 15 8'
                      >
                        {
                          tempColumn.render ?
                          tempColumn.render(newDataSource, item._column_item_record, index)
                          :
                          <TextEllipsis line={tempColumn.textLine || (rowHeight ? '1' : '100')} fontSize={fontSize} color={color} >{value}</TextEllipsis>
                        }
                      </Flex>
                    </Animate>
                  </Animate>
                )
              })
            }
          </Box>
        ))
        :
        newDataSource.map((item, index) => (
          <Box 
            size={`100% ${rowHeight || 'auto'}`}
            key={index}
            display='flex'
            flexWrap='nowrap'
            minHeight={DEFAULT_HEIGHT}
            bgColor={index % 2 === 0 ? rowBgColorLight : rowBgColor}
          >
            {
              Object.entries(item).map(([key, value]: any) => {
                if(key.includes('_column_')) return null
                const tempColumn = getCloumnsItemByKey(columns, key)
                return (
                  <Animate 
                    size={`${tempColumn.width || DEFAULT_WIDTH} auto`}
                    bgColor={tempColumn.columnBgColor || ''}
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation()
                      // 隐藏筛选面板
                      if(showScreen.show === 1){
                        setShowScreen(prev => ({
                          ...prev,
                          show: 0
                        }))
                      }else{
                        if(selectItem.row === index){
                          setSelectItem({
                            row: -1,
                            col: '',
                            animate: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
                            animateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
                          })
                        }else{
                          setSelectItem({
                            row: index,
                            col: key,
                            animate: itemAnimate.backgroundColor(selectLineColor).step().export(),
                            animateOff: itemAnimate.backgroundColor('rgba(0,0,0,0)').step().export(),
                          })
                        }
                      }
                    }}
                    animation={
                      (() => {
                        if(tempColumn.sort){
                          if(sortColumn.colKey === tempColumn.dataIndex) return sortColumn.colAnimate 
                          return sortColumn.colAnimateOff
                        }
                        if(tempColumn.screen){
                          if(screenData['_' + tempColumn.dataIndex]?.length > 0) return columnAnimate.columnAnimate
                          return columnAnimate.columnAnimateOff
                        }
                        return {actions: []}
                      })()
                    }
                  >
                    <Animate
                      animation={(selectItem.row === index) ? selectItem.animate : selectItem.animateOff}
                      size='100% 100%'
                    >
                      <Flex 
                        size='100% 100%'
                        flex={tempColumn.flex || 'frcc'}
                        padding='15 8 15 8'
                      >
                        {
                          tempColumn.render ?
                          tempColumn.render(newDataSource, item._column_item_record, index)
                          :
                          <TextEllipsis line={tempColumn.textLine || (rowHeight ? '1' : '100')} fontSize={fontSize} color={color} >{value}</TextEllipsis>
                        }
                      </Flex>
                    </Animate>
                  </Animate>
                )
              })
            }
          </Box>
        ))
      }
    </Block>
  )
  

  
  const RowVirtual = React.memo(({ id, index, data }: any) => {
    return (
      <Box
        id={id}
        size={`100% ${rowHeight || 'auto'}`}
        display='flex'
        flexWrap='nowrap'
        bgColor={index % 2 === 0 ? rowBgColorLight : rowBgColor}
      >
        {
          Object.entries(data[index]).map(([key, value]: any) => {
            if(key.includes('_column_')) return null
            return (
              <Flex
                size={`${data[index]['_column_' + key].width || DEFAULT_WIDTH} ${rowHeight || DEFAULT_HEIGHT}`}
                flex={data[index]['_column_' + key].flex || 'frcc'}
                padding='15 8 15 8'
              >
                {
                  data[index]['_column_' + key].render ? 
                  data[index]['_column_' + key].render(value, data[index], index)
                  :
                  <TextEllipsis line={data[index]['_column_' + key].textLine || (rowHeight ? '1' : '100')} fontSize={fontSize} color={color} >{value}</TextEllipsis>
                }
              </Flex>
            )
          })
        }
      </Box>
    );
  })
  
  return(
    <Box 
      size={virtualSize || size}
      position='relative'
      overflow='hidden'
      radius={radius}
      zIndex='1'
      onClick={() => {
        if(showScreen.show === 1){
          setShowScreen(prev => ({
            ...prev,
            show: 0
          }))
        }
      }}
    >
      {
        virtualSize ?
        <Box size='100% 100%'>
          <Line size={`100% ${rowHeight || DEFAULT_HEIGHT}`} />
          {RowTitle}
          {
            mounted && 
            <VirtualList
              width={(+virtualSize.split(' ')[0]) / rtx} /* 列表的宽度 */
              height={((+virtualSize.split(' ')[1]) - (+(rowHeight || DEFAULT_HEIGHT))) / rtx} /* 列表的高度 */
              itemData={newDataSource} /* 渲染列表的数据 */
              itemCount={newDataSource.length} /*  渲染列表的长度 */
              itemSize={(+(rowHeight || DEFAULT_HEIGHT)) / rtx} /* 列表单项的高度  */
              overscanCount={+overscanCount}
            >
              {RowVirtual}
            </VirtualList>
          }
          <TablePop
            themeColor={themeColor}
            isShow={showScreen.show}
            itemList={screenData[showScreen.selectKey]}
            selectList={screenData['_' + showScreen.selectKey]}
            onChange={(selectList) => {
              setScreenData(prev => ({
                ...prev,
                [`_${showScreen.selectKey}`]: selectList
              }))
            }}
            left={showScreen.left}
            width={showScreen.width}
            lineColor={lineColor}
            titleBgColor={titleBgColor}
            hoverColor={hoverColor}
            IconSelect={IconSelect}
            IconSelectActive={IconSelectActive}
            color={color}
            fontSize={fontSize}
          />
        </Box>
        :
        <ScrollView
          id={id}
          scrollTop={showScreen.show === 1 ? '0' : ''}
          scrollY={showScreen.show === 1 ? false : true}
          scrollX={scrollX}
          enhanced={true}
          bounces={false}
        >
          <Box size='auto auto'>
            {RowTitle}
            {mounted && RowData}
            {
              loading ?
              <Flex flex='frcc' size='100% 40'>
                <Text fontSize={fontSize} color='#8a8a8a'>加载中...</Text>
              </Flex>
              :
              dataSource.length === 0 ?
              <Flex flex='frcc' size='100% 40'>
                <Text fontSize={fontSize} color='#8a8a8a'>暂无内容</Text>
              </Flex>
              : null
            }
          </Box>
          <TablePop
            themeColor={themeColor}
            isShow={showScreen.show}
            itemList={screenData[showScreen.selectKey]}
            selectList={screenData['_' + showScreen.selectKey]}
            onChange={(selectList) => {
              setScreenData(prev => ({
                ...prev,
                [`_${showScreen.selectKey}`]: selectList
              }))
            }}
            left={showScreen.left}
            top={showScreen.top}
            width={showScreen.width}
            lineColor={lineColor}
            titleBgColor={titleBgColor}
            hoverColor={hoverColor}
            IconSelect={IconSelect}
            IconSelectActive={IconSelectActive}
            color={color}
            fontSize={fontSize}
          />
        </ScrollView>
      }
    </Box>
  )
}

export default memo(Table) as React.ElementType<TableProps>