import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const prefixCls = 'page-content-meal-card';

export interface CardProps {
  // 标题
  title?: any;
  // 图片地址
  src?: any;
  // 类型
  type?: string;
}

class Index extends Component<CardProps> {

  static defaultProps = {
    title: "",
    dataSource: {},
    operation: ""
  }

  state = {}

  componentDidMount() {
  }

  render() {
    const { src, title, type='info' } = this.props

    return (
      <View className={prefixCls}>
        <Image className={`${prefixCls}-image`} src={src} mode="scaleToFill" />
        <View className={`${prefixCls}-mask ${prefixCls}-mask-${type}`}>

        </View>
        <View className={`${prefixCls}-content`}>
          {title}
          <View className={`${prefixCls}-content-line`} />
        </View>
      </View>
    )
  }
}

export default Index
