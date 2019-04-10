import Taro, { Component } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import './index.less';

const prefixCls = 'components-swiper';

export interface XSwiperProps {
  // 数据源
  dataSource?: Array<any>;
}

class App extends Component<XSwiperProps> {
  state = {
    current: 0
  }

  handleChange = (data) => {
    const { detail } = data
    const { current } = detail

    this.setState({current})
  }


  render() {
    const { dataSource } = this.props;
    const { current } = this.state;

    return (
      <View className={prefixCls}>
        <Swiper
          circular
          onChange={this.handleChange}
          autoplay
        >
          {
            dataSource && dataSource.map((src, index) => (
              <SwiperItem
                key={index}
              >
                <Image src={src} mode="scaleToFill" />
              </SwiperItem>
            ))
          }
        </Swiper>
        <View className={`${prefixCls}-doc`}>
          {
            dataSource && dataSource.map((src, index) => (
              <View key={index} className={`${prefixCls}-doc-item ${index === current ? `${prefixCls}-doc-item-active` : ''}`}></View>
            ))
          }
        </View>
      </View>

    )
  }
}

export default App
