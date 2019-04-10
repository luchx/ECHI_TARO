import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less';

const prefixCls = 'components-tabs';

export interface XTabsProps {
  // 数据源
  dataSource: any;
  // 当前激活 tab 面板的 key
  activeKey?: number;
  // 切换面板的回调
  onChange?: Function
}

class App extends Component<XTabsProps> {
  state = {
    actvieKey: 1
  }

  /**
   * 切换开关
   * @param key 切换的开关的标识
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
          className={`${prefixCls}-left ${activeKey == 1 ? `${prefixCls}-active` : ''}`}
          onClick={() => { this.handleToggle(1) }}
        >
          {dataSource[0] && dataSource[0].value}
        </View>
        <View
          className={`${prefixCls}-right ${activeKey == 2 ? `${prefixCls}-active` : ''}`}
          onClick={() => { this.handleToggle(2) }}
        >
          {dataSource[1] && dataSource[1].value}
        </View>
      </View>
    )
  }
}

export default App
