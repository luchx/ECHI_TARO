import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less';

const prefixCls = 'components-title';


export interface XSwiperProps {
  // 图标指定
  children?: any
}

class App extends Component<XSwiperProps> {

  render() {

    return (
      <View className={prefixCls}>{this.props.children}</View>
    )
  }
}

export default App
