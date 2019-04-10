import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less';

const prefixCls = 'components-switch';

export interface XSwitchProps {
  // 数据源
  dataSource: any,
  // 当前激活 tab 面板的 key
  activeKey?: number;
  // 切换面板的回调
  onChange?: Function
}

class App extends Component<XSwitchProps> {
  /**
   * 切换选项
   * @param key 切换的选项标示
  */
  handleToggle = (key) => {
    const { onChange } = this.props

    onChange && onChange(key)
  }

  render() {
    const { dataSource, activeKey } = this.props;

    return (
      <View className={prefixCls}>
        <View
          className={`${prefixCls}-arrow-left ${activeKey == 1 ? `${prefixCls}-arrow-active` : ''}`}
          onClick={() => { this.handleToggle(1) }}
        >
          {dataSource[0] && dataSource[0].value}
        </View>
        <View
          className={`${prefixCls}-arrow-right ${activeKey == 2 ? `${prefixCls}-arrow-active` : ''}`}
          onClick={() => { this.handleToggle(2) }}
        >
          {dataSource[1] && dataSource[1].value}
        </View>
        <View className={`${prefixCls}-oval ${activeKey == 2 ? `${prefixCls}-oval-move` : ''}`}>
          <View className={`${prefixCls}-oval-content`}>
          </View>
        </View>
      </View>
    )
  }
}

export default App
