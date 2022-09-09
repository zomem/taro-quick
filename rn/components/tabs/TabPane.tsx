import React, {} from 'react'

import {Block, Box, Line, ScrollView, Text} from '../Components'

export interface TabPaneProps {
  tab: string | number
  index?: number
  currentIndex?: number
}

interface InnerTabPaneProps extends TabPaneProps {
  children?: React.ReactNode
  isContentScroll?: boolean
  contentHeight?: string
  onScrollToLower?: (event: any) => void
  onScrollToUpper?: (event: any) => void
  contentPadding?: string
  tabHeight?: string
  hideTab?: boolean
}

const TabPane = ({
  children, isContentScroll=false, contentHeight,
  onScrollToLower=() => {}, contentPadding,
  onScrollToUpper=() => {}, tabHeight='86', hideTab=false
}: InnerTabPaneProps) => {
  

  return (
    <Block>
      {
        isContentScroll ?
        <ScrollView 
          scrollY 
          padding={contentPadding}
          size={`100% ${contentHeight}`}
          onScrollToLower={onScrollToLower}
          onScrollToUpper={onScrollToUpper}
        >
          {!hideTab && <Line size={`100% ${tabHeight}`} />}
          {children}
        </ScrollView>
        :
        <Box size={`100% ${contentHeight}`} padding={contentPadding}>
          {!hideTab && <Line size={`100% ${tabHeight}`} />}
          {children}
        </Box>
      }
    </Block>
  )
}

export default TabPane