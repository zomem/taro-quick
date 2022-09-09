import React, { memo, useMemo, useState, useCallback, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components-rn'
import { Animated, VirtualizedList } from 'react-native'
import {Block, Box, Flex, Line, Text, ScrollView, TextEllipsis, Press, TFlexWay} from '../Components'

import {getCloumnsItemByKey, reOrderDataSource, sortBy, getScreenData, screenBy, DEFAULT_HEIGHT, DEFAULT_WIDTH} from './utils'
import { RTX } from '../../constants/constants'

// import TablePop from './TablePop'


export interface Column {
  title: string
  dataIndex: string
  /** 是否启用排序 */
  sort?: boolean
  // /** 是否启用筛选 */
  // screen?: boolean
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
  // /** x轴 是否可以滚动 */
  // scrollX?: boolean
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
  /** 表格标题分栏的线条颜色, 和进度条底色 */
  lineColor?: string
  /** 行分隔颜色，浅色 */
  rowBgColorLight?: string
  /** 行分隔颜色，深色 */
  rowBgColor?: string
  /** 每个小方格的 padding */
  itemPadding?: string
  /** 每行数据，唯一ID */
  rowKey?: string
  /** 是否正在加载 */
  loading?: boolean
}





const Table = ({
  dataSource, id, columns, scrollX=false, selectLineColor='rgba(255, 195, 0, 0.19)', 
  themeColor='#1890ff', titleBgColor='rgba(255, 255, 255, 1)', mounted=true, rowHeight, overscanCount='1', radius='0',
  IconSort, IconScreen, IconSortActive, IconScreenActive, fontSize='32', color='#060606', hoverColor='#f2f2f2', lineColor='#ededed',
  rowBgColor='#ffffff', rowBgColorLight='#f5f5f5', IconSelect, IconSelectActive, size='100% 100%',
  itemPadding='15 8 15 8', loading, virtualSize, rowKey='id'
}: TableProps) => {

  const [percent, setPercent] = useState(30)  // 加载中，动画

  const [newDataSource, setNewDataSource] = useState<any>([{}])
  const [selectItem, setSelectItem] = useState<{row: number; col: string;}>({row: -1, col: '', })  // 行index, 列 dataIndex

  const [sortColumn, setSortColumn] = useState<{colKey: string; sortBy: -1 | 0 | 1; }>({
    colKey: '',
    sortBy: 0,  // -1 为降序排列，， 0 为不排列，， 1 为升序排列
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

  
  const animatedValue = useRef(new Animated.Value(0)).current


  const rIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  const rOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }


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
      })
      rOut()
    }else{
      switch(sortColumn.sortBy) {
        case 0:
          setSortColumn({
            colKey: col,
            sortBy: -1,
          })
          rOut()
          return
        case -1:
          setSortColumn({
            colKey: col,
            sortBy: 1,
          })
          rIn()
          return
        case 1:
          setSortColumn(prev => ({
            ...prev,
          }))
          rOut()
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
  }, [sortColumn.sortBy, sortColumn.colKey, selectLineColor, themeColor, rIn, rOut])


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
      setShowScreen(prev => ({
        ...prev,
        selectKey: item.dataIndex,
        show: 1,
        left: '33',
        // top: `${(res[0].scrollTop * rtx + 80) >>> 0}`,
        width: item.width || DEFAULT_WIDTH
      }))
    }
  }, [showScreen.show, columns, id])

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
        scrollX ?
        <Box position='absolute' top='0' left='0' zIndex='10'>
          <View
            style={{
              width: newDataSource[0]['_column_row_width'],
              height: +(rowHeight || DEFAULT_HEIGHT) * RTX || 'auto',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: titleBgColor
            }}
          >
            {
              columns.map((item, index) => (
                <Flex flex='frbc' key={item.dataIndex} size={`${item.width || DEFAULT_WIDTH} 100%`}>
                  <Line size='1 40' />
                    <Flex 
                      size={`100% 100%`}
                      flex={item.flex || 'frcc'}
                      bgColor={item.columnBgColor || ''}
                      padding={itemPadding}
                    >
                    {
                      item.sort ?
                      <Press
                        size={`100% 100%`}
                        onClick={(e) => {
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
                              <Animated.View
                                style={{
                                  transform: [{rotate: animatedValue.interpolate({inputRange: [0, 100], outputRange: ['0deg', '360deg']})}]
                                }}
                              >
                                {IconSortActive}
                              </Animated.View>
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
                        size={`100% 100%`}
                        onClick={(e) => {
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
                  <Line size={`1 ${+(rowHeight || DEFAULT_HEIGHT) * 0.6}`} bgColor={index < columns.length - 1 ? themeColor : ''} />
                </Flex>
              ))
            }
          </View>
          <Line size='100% 1' bgColor={themeColor} />
        </Box>
        :
        <Box size='100% auto' position='absolute' top='0' left='0' zIndex='10'>
          <View 
            style={{
              width: 'auto',
              height: +(rowHeight || DEFAULT_HEIGHT) * RTX || 'auto',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: titleBgColor
            }}
          >
            {
              columns.map((item, index) => (
                <Flex flex='frbc' key={item.dataIndex} size={`${item.width || 'auto'} 100%`}>
                  <Line size='1 40' />
                  {
                    item.sort ?
                    <Press
                      size={`100% 100%`}
                      onClick={(e) => {
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
                      <Flex size={`100% 100%`} flex={item.flex || 'frcc'} bgColor={item.columnBgColor || ''} padding={itemPadding} >
                        <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                        <Flex size='42 50' flex='frcc'>
                          {
                            sortColumn.colKey === item.dataIndex ?
                            <Animated.View
                              style={{
                                transform: [{rotate: animatedValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg']})}]
                              }}
                            >
                              {IconSortActive}
                            </Animated.View>
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
                        if(showScreen.show === 1){
                          setShowScreen(prev => ({
                            ...prev,
                            show: 0
                          }))
                        }
                      }}
                    >
                      <Flex size={`100% 100%`} flex={item.flex || 'frcc'} bgColor={item.columnBgColor || ''} padding={itemPadding} >
                        <TextEllipsis line={item.textLine} fontSize={fontSize} color={color}>{item.title}</TextEllipsis>
                      </Flex>
                    </Press>
                  }
                  <Line size={`1 ${+(rowHeight || DEFAULT_HEIGHT) * 0.6}`} bgColor={index < columns.length - 1 ? themeColor : ''} />
                </Flex>
              ))
            }
          </View>
          <Line size='100% 1' bgColor={themeColor} />
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
          <View
            key={index}
            style={{
              width: item['_column_row_width'],
              height: +(rowHeight || DEFAULT_HEIGHT) * RTX || 'auto',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              flexDirection: 'row',
              minHeight: +(rowHeight || DEFAULT_HEIGHT) * RTX,
              backgroundColor: index % 2 === 0 ? rowBgColorLight : rowBgColor
            }}
          >
            {
              Object.entries(item).map(([key, value]: any) => {
                if(key.includes('_column_')) return null
                const tempColumn = getCloumnsItemByKey(columns, key)
                return (
                  <Box 
                    key={key}
                    onClick={(e) => {
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
                          })
                        }else{
                          setSelectItem({
                            row: index,
                            col: key,
                          })
                        }
                      }
                    }}
                    size={`${tempColumn.width || DEFAULT_WIDTH} auto`}
                    bgColor={tempColumn.columnBgColor || ''}
                  >
                    <Flex 
                      size='100% 100%'
                      flex={tempColumn.flex || 'frcc'}
                      padding={itemPadding}
                    >
                      {
                        tempColumn.render ?
                        tempColumn.render(newDataSource, item._column_item_record, index)
                        :
                        <TextEllipsis line={tempColumn.textLine || (rowHeight ? '1' : '100')} fontSize={fontSize} color={color} >{value}</TextEllipsis>
                      }
                    </Flex>
                  </Box>
                )
              })
            }
          </View>
        ))
        :
        newDataSource.map((item, index) => (
          <View 
            key={index}
            style={{
              width: 'auto',
              height: +(rowHeight || DEFAULT_HEIGHT) * RTX || 'auto',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              flexDirection: 'row',
              minHeight: +(rowHeight || DEFAULT_HEIGHT) * RTX,
              backgroundColor: index % 2 === 0 ? rowBgColorLight : rowBgColor
            }}
          >
            {
              Object.entries(item).map(([key, value]: any) => {
                if(key.includes('_column_')) return null
                const tempColumn = getCloumnsItemByKey(columns, key)
                return (
                  <Box 
                    key={key}
                    size={`${tempColumn.width || DEFAULT_WIDTH} auto`}
                    bgColor={tempColumn.columnBgColor || ''}
                    onClick={(e) => {
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
                          })
                        }else{
                          setSelectItem({
                            row: index,
                            col: key,
                          })
                        }
                      }
                    }}
                  >
                    <Flex 
                      size='100% 100%'
                      flex={tempColumn.flex || 'frcc'}
                      padding={itemPadding}
                    >
                      {
                        tempColumn.render ?
                        tempColumn.render(newDataSource, item._column_item_record, index)
                        :
                        <TextEllipsis line={tempColumn.textLine || (rowHeight ? '1' : '100')} fontSize={fontSize} color={color} >{value}</TextEllipsis>
                      }
                    </Flex>
                  </Box>
                )
              })
            }
          </View>
        ))
      }
    </Block>
  )
  


  
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
      {RowTitle}
      {
        virtualSize ?
        <Block>
          <Line size={`100% ${rowHeight || DEFAULT_HEIGHT}`} />
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
          <VirtualizedList
            data={newDataSource}
            initialNumToRender={9}
            keyExtractor={(item: any) => item[rowKey]}
            renderItem={({item, index}) => (
              <View
                key={item[rowKey]}
                style={{
                  width: 'auto',
                  height: +(rowHeight || DEFAULT_HEIGHT) * RTX || 'auto',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  minHeight: +(rowHeight || DEFAULT_HEIGHT) * RTX,
                  backgroundColor: index % 2 === 0 ? rowBgColorLight : rowBgColor
                }}
              >
                {
                  Object.entries(item).map(([key, value]: any) => {
                    if(key.includes('_column_')) return null
                    const tempColumn = getCloumnsItemByKey(columns, key)
                    return (
                      <Box 
                        key={key}
                        size={`${tempColumn.width || DEFAULT_WIDTH} auto`}
                        bgColor={tempColumn.columnBgColor || ''}
                        onClick={(e) => {
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
                              })
                            }else{
                              setSelectItem({
                                row: index,
                                col: key,
                              })
                            }
                          }
                        }}
                      >
                        <Flex 
                          size='100% 100%'
                          flex={tempColumn.flex || 'frcc'}
                          padding={itemPadding}
                        >
                          {
                            tempColumn.render ?
                            tempColumn.render(newDataSource, item._column_item_record, index)
                            :
                            <TextEllipsis line={tempColumn.textLine || (rowHeight ? '1' : '100')} fontSize={fontSize} color={color} >{value}</TextEllipsis>
                          }
                        </Flex>
                      </Box>
                    )
                  })
                }
              </View>
            )}
            getItemCount={(data: any) => data.length}
            getItem={(data, index) => data[index]}
            windowSize={(+(rowHeight || DEFAULT_HEIGHT) * RTX) * +overscanCount}
            getItemLayout={(data, index) => ({length: data.length, offset: index * (+(rowHeight || DEFAULT_HEIGHT) * RTX), index: index})}
          />
        </Block>
        :
        <ScrollView
          size='100% 100%'
          scrollTop={showScreen.show === 1 ? '0' : ''}
          scrollY={showScreen.show === 1 ? false : true}
          scrollX={scrollX}
        >
          <Line size={`100% ${rowHeight || DEFAULT_HEIGHT}`} />
          {RowData}
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
          {/* <TablePop
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
          /> */}
        </ScrollView>
      }
    </Box>
  )
}

export default memo(Table) as React.ElementType<TableProps>