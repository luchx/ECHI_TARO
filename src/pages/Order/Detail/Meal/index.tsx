import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import XSwiper from '@components/XSwiper'
import XTitle from '@components/XTitle'
import { unique } from '@utils/function'
import Card from './_components/Card'
import './index.less'

export interface IndexProps {
  dataSource?: any
}

class Index extends Component<IndexProps> {

  state = {
    swiperSrc: [
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=971903522,2055241417&fm=26&gp=0.jpg',
      'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg',
      'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg'
    ],
    mealData: [
      { src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=971903522,2055241417&fm=26&gp=0.jpg', title: '专业版套餐' },
      { src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg', title: '尊享版套餐', type: 'danger' }
    ]
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { swiperSrc, mealData } = this.state

    return (
      <View className="page-content-meal">
        <View className="page-header">
          <XSwiper dataSource={swiperSrc} />
        </View>
        <View className="page-content">
          <XTitle>选择生酮套餐</XTitle>
          {
            mealData && mealData.map(x => <Card title={x.title} src={x.src} key={unique()} type={x.type} />)
          }
        </View>
      </View>
    )
  }
}

export default Index
