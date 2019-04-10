import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

const prefixCls = 'components-menu-modal-detail-item';

export interface ItemProps {
  // 标题
  title?: any;
  // 数据源
  dataSource?: any;
  // 选择的标示
  activeKey?: any;
  // 点击事件
  onClick?: any;
}

class Index extends Component<ItemProps> {

  handleClick = (item) => {
    const { onClick } = this.props

    onClick && onClick(item)
  }

  render() {
    const { dataSource, activeKey, title } = this.props

    return (
      <View>
        <View className={`${prefixCls}`}>
          <View className={`${prefixCls}-title`}>
            {title}
          </View>
          <View className={`${prefixCls}-content`}>
            {
              dataSource && dataSource.map(item => (
                <View
                  className={`${prefixCls}-content-item  ${activeKey === item.value ? `${prefixCls}-content-item-active` : ''}`}
                  onClick={()=>{this.handleClick(item)}}
                  key={item.value}
                >
                  {item.label}
                </View>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Index

