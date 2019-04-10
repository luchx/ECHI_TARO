import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import XIcon from '@components/XIcon'
import classNames from 'classnames';
import './index.less';

const prefixCls = 'components-modal';

export interface XSwiperProps {
  // 长度
  width?: any;
  // 是否打开/显示
  isOpened?: Boolean;
  // 模态框面板的状态 scale:放大 | default
  mode?: string;
  // 关闭modal
  onClose?: Function
  // 容器类名
  className?: string
}

class App extends Component<XSwiperProps> {

  handleClose = () => {
    const { onClose } = this.props

    onClose && onClose({ isOpened: false })
  }


  render() {
    const { width, isOpened, mode = 'default', className = "" } = this.props

    const wrapClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-hidden`]: !isOpened,
    });

    const contentBaseClass = {
      [`${prefixCls}-content`]: true,
      [className]: true
    }

    const contentScaleClassName = classNames({
      ...contentBaseClass,
      [`${prefixCls}-content-scale`]: true,
      [`${prefixCls}-content-scale-animation`]: isOpened,
    });

    const contentDefaultClassName = classNames({
      ...contentBaseClass,
      [`${prefixCls}-content-default`]: true,
    });

    const style = `width:${width || 'auto'}`

    let WrapContent = null as any

    switch (mode) {
      case 'scale': {
        WrapContent = <View className={contentScaleClassName} style={style}>
          <View
            className={`${prefixCls}-content-scale-close`}
            onClick={this.handleClose}
          >
            <XIcon type='close' size={48} />
          </View>
          {this.props.children}
        </View>
        break
      }
      case 'default': {
        WrapContent = <View className={contentDefaultClassName} style={style}>
          {this.props.children}
        </View>
        break
      }
    }

    return (
      <View className={wrapClassName}>
        {WrapContent}
        <View className={`${prefixCls}-mask`} />
      </View>
    )
  }
}

export default App
