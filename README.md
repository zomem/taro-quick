
**Taro 和 React 项目的高效开发组件库。**  
  
目前仅支持：微信小程序，rn，web `(Taro React Typescript)` 项目。    
  
### 一、组件  
   
```js
  // 小程序组件
  import { Page, Box, Flex } from "taro-quick/mini"
  // react-native 组件
  import { Page, Text } from "taro-quick/rn"
  // 网页web
  import { Box, Flex } from "taro-quick/web"
```
  
使用 `Page` 组件时，页面要设置为 `navigationStyle: custom`**（非必要不推荐使用 Page。还是原生导航栏更好）**。  
为了可以实现深色模式，组件里面的图标都是以组件参数的方式传入。一般为`Icon*`    
    
**组件列表：**  
  
|     组件           |        说明            |       组件     |          说明               |
|     ----          |        ----           |          ----  |          ----               |
|   1.**Block**     |  块，（不会被渲染）      |     2.**Box**  |     盒子，同view, 不支持flex  |
|   3.**Flex**      |   flex布局专用，同view  |   4.**Press**  |     点击事件，含open-type     |
|   5.**SafeArea**  |     上下自动安全区域      |    6.**Line**  |   线，也可设置上下安全距离     |
|   7.**Text**      |       文本             |8.**TextEllipsis**|     多行自动省略的文本       |
|   9.**Image**     |        图片            |   10.**Input** |          输入               |
|   11.**Textarea** |       段落输入         |  12.**Button**  |          按钮              |
|   13.**Swiper**   |滑块，采用childList方式传值| 14.**ScrollView** |     滚动视图             |
|   15.**Animate**  |  动画组件，同view      |   16.**Page**    |            页面           |
|   17.**Modal**    |        弹窗           |   18.**Drawer**  |    底部弹起的抽屉(mini)     |
|   19.**Radio**    |        单选框         |   20.**Checkbox**|          复选框           |
|  21.**Highlight** |       文本高亮         |   22.**Tabs**   |         选项卡切换          |
|  23.**Search**    |       搜索框(mini)    |   24.**Tag**     |            标签           |
|  25.**Table**     |       表格            |    26.**CatLine**  |        分类栏目(rn)       |
|  27.**Loading**   |       加载(rn)        |    28.**BoxImg**    |  带背景图的盒子(rn)       |
|  29.**UploadImage** |    图片上传(mini)    |    30.**-**           |                    |



### 二、小程序，使用前配置  
安装  
```shell
  # linaria 测试过 3.x
  yarn add @linaria/babel-preset
  yarn add @linaria/core
  yarn add @linaria/react
  yarn add @linaria/shaker

  yarn add @linaria/webpack-loader --dev
```  
**1.在 `config/index.js` 里，修改配置**  
  
```js
  mini: {
    webpackChain(chain, webpack) {
      // linaria/loader 选项详见 https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md#webpack
      chain.module
        .rule('script')
        .use('linariaLoader')
        .loader('@linaria/webpack-loader')
        .options({
          sourceMap: process.env.NODE_ENV !== 'production',
        })
    },
    ...
  }
  ...
  h5: {
    webpackChain(chain, webpack) {
      chain.module
        .rule('script')
        .use('linariaLoader')
        .loader('@linaria/webpack-loader')
        .options({
          sourceMap: process.env.NODE_ENV !== 'production',
        })
    },
    ...
  }
```

**2.在根目录修改 `babel.config.js`**    
  
```js
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }],
    '@linaria'
  ]
}
```

**3.在根目录下新增文件 `linaria.config.js` 内容如下**    
  
```js
module.exports = {
  rules: [
    {
      action: require("@linaria/shaker"),
    },
    {
      test: /node_modules[\/\\](?!@tarojs)/,
      action: "ignore"
    }
  ]
}
```

### 三、网页使用(React Typescript)  
安装  
```shell
  # linaria 测试过 3.x
  yarn add @linaria/babel-preset
  yarn add @linaria/core
  yarn add @linaria/react
  yarn add @linaria/shaker
  yarn add react-scripts

  yarn add @linaria/webpack-loader --dev
  yarn add customize-cra --dev
  yarn add ts-loader --dev
```  
> 注意：要把打包工具的忽略 // exclude: /node_modules/, 注释掉，因为这个组件库是tsx文件。也要参与编译。
**1.添加文件 `/.babelrc.json` 里，修改配置**  
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@linaria"
  ]
}
```

**2.添加文件 `/.env` 里，修改配置**  
```js
SKIP_PREFLIGHT_CHECK=true
```  

**3.添加文件 `/config-overrides.js` 里，修改配置**  
```js
const { useBabelRc, override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra')
const path = require('path')

module.exports = override(
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: '@linaria/webpack-loader',
        options: {
          cacheDirectory: 'src/.linaria_cache',
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ],
  }),
  // 配置路径别名
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  })
)
```

### 四、使用示例  
  
```jsx
import React, {useEffect, useState, useMemo} from 'react'
import {useSelector} from 'react-redux'
import Taro from '@tarojs/taro'

import {
  Block, Box, SafeArea, Press, Flex,
  Line, Text, TextEllipsis, Image, Input, Textarea,
  Button, Swiper, Switch, Page, Modal, Drawer,
  Radio, Checkbox, Highlight, Tabs, Search, Tag, Table,
  Column, UploadImage
} from 'taro-quick/mini'
import Loading from '@/components/widget/Loading'
import CatLine from '@/components/widget/CatLine'
import {useModalStyles, usePageStyles, useDrawerStyles, useCheckboxStyles, useRadioStyles, useTableStyles} from '@/hooks/useStyles'
import IconFont from '@/components/iconfont'
import styles from '@/constants/styles'
import ICON_CAMERA from '@/images/icons/camera.svg'


function Demo() {
  const testImage = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1115%2F101021113337%2F211010113337-7-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636592114&t=88e20a62a7153917316ab52140bf7703'

  const pageStyles = usePageStyles()
  const modalStyles = useModalStyles()
  const drawerStyles = useDrawerStyles()
  const checkboxStyles = useCheckboxStyles()
  const radioStyles = useRadioStyles()
  const tableStyles = useTableStyles()

  const [check, setCheck] = useState(true)

  const [uploadImages, setUploadImages] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  const [current, setCurrent] = useState(0)

  const [radioV, setRadioV] = useState('')
  const [checkV, setCheckV] = useState<any[]>([])

  const [tabCurrent, setTabCurrent] = useState(0)

  const [search, setSearch] = useState('')


  const [options, setOptions] = useState({
    gtid: 0,
    gpid: 0,
  })

  useEffect(() => {
    const instance = Taro.getCurrentInstance()
    const gtid = parseInt(instance.router?.params.gtid || '0')
    const gpid = parseInt(instance.router?.params.gpid || '0')
    setOptions({
      gtid: gtid,
      gpid: gpid,
    })

  }, [])




  const columns2 = useMemo<Column[]>(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '25%',
        sort: true,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        width: '30%'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: '20%',
        sort: true
      },
      {
        title: '性别',
        dataIndex: 'gender',
        width: '25%',
        textLine: '4',
        screen: true
      }
    ]
  }, [])

  const dataSource2 = useMemo(() => {
    return [
      {
        username: '小红',
        telephone: '123',
        age: 1,
        gender: '女',
        height: 12,
        id: 1,
        math: 1,
      },
      {
        username: '小明',
        telephone: '456',
        age: 3,
        gender: '男',
        height: 123,
        id: 2,
      },
      {
        username: '小明',
        telephone: '456',
        age: 12,
        gender: '男',
        height: 23,
        id: 3,
        math: 2,
      },
      {
        username: '小明',
        telephone: '456',
        age: 24,
        gender: '这里只展示纵向滚动，横向同理就不用说明了，可自己尝试',
        height: 63,
        id: 4,
      },
      {
        username: '小明',
        telephone: '12312312312',
        age: 15,
        gender: '男',
        height: 83,
        id: 5,
      },
      {
        username: '小明',
        telephone: '456',
        age: 8,
        gender: '男',
        height: 223,
        id: 7,
      },
      {
        username: '小明',
        telephone: '456',
        age: 8,
        gender: '男',
        height: 223,
        id: 8,
      },
      {
        username: '小明',
        telephone: '456',
        age: 8,
        gender: '男',
        height: 223,
        id: 9,
      },
      {
        username: '小明',
        telephone: '456',
        age: 8,
        gender: '男',
        height: 223,
        id: 10,
      },
      {
        username: '小明',
        telephone: '18722565454555459984',
        age: 8,
        gender: '男',
        height: 223,
        id: 11,
      },
    ]
  }, [])




  return (
    <Block>
      <Page navTitle='示例' padding='25' {...pageStyles}>
        <Line size='1 80' />
        <Search
          bgColor={styles.boxColor}
          IconSearch={<IconFont name='search' size={42} color={styles.textColorLight} />}
          placeholderColor={styles.textColorLight}
          color={styles.textColor}
          value={search}
          onInput={(value) => setSearch(value)}
        />

        <Line size='1 80' />
        <Block>
          <Text color={styles.textColor}>Block 分块组件，没有属性</Text>
        </Block>

        <Line size='1 80' />
        <Box bgColor={styles.boxColor} padding='30' radius='30' color={styles.textColor}>
          Box 盒子，可以有基础样式
        </Box>
        <Box bgGradient={['90deg', 'red', 'blue']} padding='30' radius='30' color={styles.textColor}>
          Box 背景渐变
        </Box>

        <Line size='1 80' />
        <SafeArea size='600 333' safe='bottom' bgColor={styles.boxColor} radius='30' bgImage={`url("${testImage}")`}>
          <Box color={styles.textColor}>SafeArea 安全区域。type='bottom'，底部适配；type='top'，顶部适配。没有其他padding和margin属性</Box>
        </SafeArea>

        <Line size='1 80' />
        <Press 
          onClick={() => {
            Taro.showToast({
              title: '点击成功',
              icon: 'none'
            })
          }}
        >
          <Text color={styles.themeColor}>Press 点击事件</Text>
        </Press>

        <Line size='1 80' />
        <Flex flex='frcc'>
          <Box size='50 50' bgColor={styles.oneColor}></Box>
          <Box size='50 50' bgColor='#7CB342'></Box>
        </Flex>
        <Flex flex='frac'>
          <Box size='50 50' bgColor='#FFC400'></Box>
          <Box size='50 50' bgColor='#7CB342'></Box>
        </Flex>
        <Flex flex='frbc'>
          <Box size='50 50' bgColor='#009688'></Box>
          <Box size='50 50' bgColor='#AB47BC'></Box>
          <Box size='50 50' bgColor='#F4511E'></Box>
        </Flex>


        <Line size='1 80' />
        <Line size='100% 15' bgColor={styles.lineColor} safe='bottom' />
        <Line size='100% 5' bgGradient={['40deg', '#AB47BC', '#009688']} />

        <Line size='1 80' />
        <Text color={styles.textColor}>Text 文本</Text>
        <Text gradient={['30deg', 'red', 'blue']}>Text 文本渐变</Text>

        <Line size='1 80' />
        <TextEllipsis line='1' color={styles.textColorGray}>TextEllipsis 可省略文本可省略文本可省略文本可省略文本可省略文本可省略文本可省略文本</TextEllipsis>
        <TextEllipsis line='1' gradient={['33deg', '#AB47BC', '#009688']}>TextEllipsis 可省略文本可省略文本可省略文本可省略文本可省略文本可省略文本可省略文本</TextEllipsis>

        <Line size='1 80' />
        <Image size='88 88' src={styles.pic} />
        <Image size='88 88' src={testImage} />

        <Line size='1 80' />
        <Input bgColor={styles.boxColor} pColor={styles.textColorLight} color={styles.textColor} />
        
        <Line size='1 80' />
        <Textarea bgColor={styles.boxColor} pColor={styles.textColorLight} color={styles.textColor}/>

        <Line size='1 80' />
        <Swiper 
          size='100% 300'
          bgColor={styles.boxColor}
          childList={[
            <Text color='#C51162'>111111</Text>,
            2222,
            <Box>33333</Box>
          ]}
        />

        <Line size='1 80' />
        <Button>按钮</Button>
        <Button disable>禁用</Button>
        <Button loading>加载</Button>

        <Line size='1 80' />
        <UploadImage
          radius='35'
          imgList={uploadImages}
          onChange={(images) => setUploadImages(images)}
          uploadUrl='https://kkkxxx'
          Icon={<Image size='42 42' src={ICON_CAMERA} />} 
        />

        <Line size='1 80' />
        <Switch onChange={(value) => console.log('Switch: ', value)} />

        <Line size='1 80' />
        <Loading />
        <Loading type='fading_circle' />
        <Loading type='timer' />
        <Loading type='line_fade' />

        <Line size='1 80' />
        <Highlight color={styles.textColor} content='Highlight 分块组件，没有属性真的没有的啊工工工工城' keyword='没有' />

        <Line size='1 80' />
        <Box size='500 80' color={styles.themeColor} onClick={() => setShowModal(true)}>打开Modal</Box>
        <Box size='500 80' color={styles.themeColor} onClick={() => setShowDrawer(true)}>打开Drawer</Box>

        <Line size='1 80' />
        <Box display='flex' flexWrap='wrap' size='100% auto'>
          {
            [1,2,3,4,5,6].map((item) => (
              <Box size='196 180' key={item} margin='0 25 25 0'>
                <Press hoverBgColor={styles.hoverColor}>
                  <Flex flex='frcc' size='196 180' borderColor={styles.themeColor}>
                    <Image size='120 120' src={testImage} radius='12' />
                  </Flex>
                </Press>
              </Box>
            ))
          }
        </Box>

        <Line size='1 80' />
        <CatLine 
          list={[{id: 1, title: '第一个'}, {id: 2, title: '第二个'}, {id: 3, title: '第三个'}]}
          current={current}
          onChange={(value) => setCurrent(value)}
        />
        <Line size='1 10' />
        <CatLine 
          list={[{id: 1, title: '第一个'}, {id: 2, title: '第二个'}, {id: 3, title: '第三个'}, {id: 4, title: '第四四四'}, {id: 5, title: '第五五五个'}, {id: 6, title: '第六个个'}]}
          isScroll
          itemWidth='150'
          current={current}
          onChange={(value) => setCurrent(value)}
        />

        <Line size='1 80' />
        <Tabs 
          contentPadding='20' 
          isContentScroll 
          tabWidth='123' 
          isTabScroll 
          current={tabCurrent} 
          onChange={(i) => setTabCurrent(i)} 
          onScrollToLower={()=>console.log('tab scroll lower')}
          size='100% 500'
          tabLineColor={styles.lineColor}
          tabBgColor={styles.navigationBgColor}
          contentBgColor={styles.boxColor}
        >
          <Tabs.TabPane tab='a'>
            <Box><Image src={testImage} size='300 400' /></Box>
            <Box><Image src={testImage} size='300 800' /></Box>
            <Box><Image src={testImage} size='300 700' /></Box>
            <Box><Image src={testImage} size='300 600' /></Box>
            <Box color={styles.textColor}>2</Box>
            <Box color={styles.textColor}>3</Box>
            <Box color={styles.textColor}>4</Box>
            <Box color={styles.textColor}>5</Box>
            <Box color={styles.textColor}>6</Box>
            <Box color={styles.textColor}>11111111111111</Box>
            <Box color={styles.textColor}>11111111111111</Box>
          </Tabs.TabPane>
          <Tabs.TabPane tab='b'>bb</Tabs.TabPane>
          <Tabs.TabPane tab='c'>cc</Tabs.TabPane>
          <Tabs.TabPane tab='E'>E</Tabs.TabPane>
          <Tabs.TabPane tab='F'>F</Tabs.TabPane>
          <Tabs.TabPane tab='G'>G</Tabs.TabPane>
          <Tabs.TabPane tab='H'>cADFc</Tabs.TabPane>
          <Tabs.TabPane tab='I'>AAA</Tabs.TabPane>
        </Tabs>

        <Line size='1 80' />
        <Radio.Group {...radioStyles} value={radioV} onChange={(value) => setRadioV(value)}>
          <Radio value="red">红色</Radio>
          <Radio value={34}>蓝色</Radio>
          <Radio value={323}>e32</Radio>
        </Radio.Group>
        <Radio.Group {...radioStyles} type='col' value={radioV} onChange={(value) => setRadioV(value)}>
          <Radio value="red">云短信服务严禁发送金融阿里云账号一旦里云实名认证信息等）并移交公安机</Radio>
          <Radio value="blue">阿里云短信服务严禁发送金融阿里云账号一旦里云实</Radio>
          <Radio value={323}>e32</Radio>
        </Radio.Group>

        <Line size='1 80' />
        <Checkbox.Group {...checkboxStyles} values={checkV} onChange={(values) => setCheckV(values)}>
          <Checkbox value='A'>A.一</Checkbox>
          <Checkbox value='B'>B.二</Checkbox>
          <Checkbox value='C'>C.三</Checkbox>
          <Checkbox value='D'>D.四</Checkbox>
        </Checkbox.Group>
        <Checkbox.Group {...checkboxStyles} type='col' values={checkV} onChange={(values) => setCheckV(values)}>
          <Checkbox value='A'>A.一</Checkbox>
          <Checkbox value='B'>B.云短信服务严禁发送金融阿里云账号一旦里云实名认证信息等）并移交公安机</Checkbox>
          <Checkbox value='C'>C.云短信服务严禁发送金融阿里云账号一旦里云实名认证信息等）并移交公安机</Checkbox>
          <Checkbox value='D'>D.四</Checkbox>
        </Checkbox.Group>

        <Line size='1 80' />
        <Tag bgColor='#9324fa' >自定义</Tag>
        <Tag bgColor='#4334fa'>在一</Tag>
        <Tag type='blue'>在一</Tag>
        <Tag type='gold'>在一个在</Tag>
        <Tag type='purple'>阿里云</Tag>
        <Tag type='red'>云短信服</Tag>

        <Line size='1 80' />
        <Table
          {...tableStyles}
          radius='15'
          id='two_table5'
          columns={columns2}
          dataSource={dataSource2}
          themeColor='rgba(0, 118, 214, 0.89)'
          selectLineColor='rgba(0, 118, 214, 0.09)'          
        />

        <Line size='1 80' />


        <Line size='1 100' safe='bottom' />
      </Page>
      
      <Modal
        {...modalStyles}
        title='标题'
        content='阿里云短信服务严禁发送金融阿里云账号一旦里云实名认证信息等）并移交公安机关处理。'
        isShow={showModal}
        onCancel={() => setShowModal(false)}
      >

      </Modal>


      <Drawer
        {...drawerStyles}
        showCancel
        height='600'
        isShow={showDrawer}
        onCancel={() => setShowDrawer(false)}
      >
        <Text color={styles.textColor}>内容</Text>
      </Drawer>
    </Block>
  )
}


export default Demo
```