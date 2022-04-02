
**Taro 简易组件库。**  
  
目前仅限 `Taro React Typescript` 微信小程序项目   
  
### 组件  
   
```js
import { Block, Box, SafeArea, Press, Flex, Line,
  Text, TextEllipsis, Image, Input, Textarea,
  Button, Swiper, Switch, ScrollView, Animate, 
  Page, Modal, Drawer, Checkbox, Radio
} from 'taro-quick'
```

使用 `Page` 组件时，页面要设置为 `navigationStyle: custom`  
  



使用前配置  
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

