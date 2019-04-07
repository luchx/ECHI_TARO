import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less';

const prefixCls = 'components-Form';


export interface XFormProps {
  // 图标指定
  children?: any;
  // 类名
  className?: string;
}

export default class Form extends Component<XFormProps> {

  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props

    return (
      <View className={`${prefixCls} ${className}`}>{this.props.children}</View>
    )
  }
}
