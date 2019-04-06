# taro-project

> 使用taro开发的小程序，项目使用koa做mock代理，配合react+mobx开发的点餐项目

## 本地运行

``` bash
# 安装依赖，或 npm i
yarn

# 运行小程序，编译后的文件位于项目下的 dist 文件夹
# （微信 dev:weapp，支付宝 dev:alipay）
npm run dev:weapp

# 运行 H5
npm run dev:h5

# 运行 React Native，请务必查阅文档：https://nervjs.github.io/taro/docs/react-native.html
npm run dev:rn
```

## 项目说明

本项目的主要目的是阐述多端开发思路、技巧，力求直观、方便阅读，因此是在 `taro init` 的基础上开发的，没有去做太多封装。诸如是用 Redux 还是 Mobx，网络请求怎么封装比较完美并不是本项目的重点。

## License

MIT
