import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames';
import './index.less'

const prefixCls = 'components-Form-Item';


export interface XFormItemProps {
  // 标题
  title?: string;
  border?: boolean
}

export default class XFormItem extends Component<XFormItemProps> {
  static defaultProps = {
    border: true
  }


  render() {
    const { title, border } = this.props

    const className = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-border`]: border,
    });

    return (
      <View className={className}>
        {title && (
          <View className={`${prefixCls}-title`}>
            {title}
          </View>
        )}
        <View className={`${prefixCls}-content`}>
          {this.props.children}
        </View>
      </View>
    )
  }
}


