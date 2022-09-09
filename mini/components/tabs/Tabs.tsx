import React, {} from 'react'

import InnerTabs, {TabsProps} from './InnerTabs'
import TabPane from './TabPane'

export interface CompoundedTabs extends React.FC<TabsProps> {
  TabPane: typeof TabPane
}

const Tabs = InnerTabs as CompoundedTabs
Tabs.TabPane = TabPane

export default Tabs