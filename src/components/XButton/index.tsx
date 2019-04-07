import Taro, { Component } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import classNames from 'classnames';
import './index.less';

const prefixCls = 'components-button';

export interface buttonProps {
  // 类型
  type?: String,
  // 子元素
  children: any;
  // 将按钮宽度调整为其父宽度的选项
  block?: Boolean;
  // 尺寸大小
  size?: string;
  // 点击事件
  onClick?: Function
}

class App extends Component<buttonProps, {}> {
  static defaultProps = {
    type: String,
  }

  handleClick = () => {
    const { onClick } = this.props;

    onClick && onClick()
  }

  render() {
    const { type, block, size } = this.props;

    const classWrapName = classNames({
      [`${prefixCls}-wrap`]: true,
      [`${prefixCls}-wrap-block`]: block,
    });

    const className = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-size-big`]: size === 'big',
      [`${prefixCls}-size-middle`]: size === 'middle',
      [`${prefixCls}-type-black`]: type === 'black',
    });

    return (
      <View className={classWrapName}>
        <Button className={className} onClick={this.handleClick}>{this.props.children}</Button>
      </View>
    )
  }
}

export default App
