import React, {} from 'react'

import {Block, Box, Line, ScrollView} from '../Components'

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
  hideTab?: boolean,
  lowerThreshold?: string
}

const TabPane = ({
  children, isContentScroll=false, contentHeight,
  onScrollToLower=() => {}, contentPadding,
  onScrollToUpper=() => {}, hideTab=false, lowerThreshold='50'
}: InnerTabPaneProps) => {
  
  return (
    <Block>
      {
        isContentScroll ?
        <ScrollView 
          scrollY
          lowerThreshold={lowerThreshold}
          padding={contentPadding} 
          size={`100% ${contentHeight}`} 
          onScrollToLower={onScrollToLower}
          onScrollToUpper={onScrollToUpper}
        >
          {!hideTab && <Line size='100% 86' />}
          {children}
        </ScrollView>
        :
        <Box size={`100% ${contentHeight}`} padding={contentPadding}>
          {!hideTab && <Line size='100% 86' />}
          {children}
        </Box>
      }
    </Block>
  )
}

export default TabPane