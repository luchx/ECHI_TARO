import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import XMenu from '@components/XMenu'
import './index.less'

export interface IndexProps {
  dataSource: {
    siderData?: any,
    swiperSrc?: any,
    contentData?: any,
    requireData?: any,
    logoSrc?: any,
  },
  height?: any,
}

class Index extends Component<IndexProps> {

  static defaultProps = {
    dataSource: { siderData: [], swiperSrc: [], contentData: [], requireData: {}, logoSrc: "" }
  }

  state = {
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { dataSource,height } = this.props
    const { siderData, swiperSrc, contentData, requireData, logoSrc } = dataSource
    return (
      <View className="page-content-drink">
        <XMenu
          height={height}
          siderData={siderData}
          logoSrc={logoSrc}
          swiperSrc={swiperSrc}
          contentData={contentData}
          requireData={requireData}
        />
      </View>
    )
  }
}

export default Index
