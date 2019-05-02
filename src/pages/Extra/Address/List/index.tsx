import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import XButton from '@components/XButton'
import XIcon from '@components/XIcon'
import Slide from '../_components/Slide'
import Empty from '../_components/Empty'
import './index.less'

const prefixCls = 'page-address-list';


export interface AddressListProps {
  // mobx 地址数据
  addressStore?: any
}

@inject('addressStore')
@observer

class Index extends Component<AddressListProps> {

  state = {
    address: '',
    list: [
      // { id: "2", name: '张三', phone: "17483928445", address: "绿城未来park" }
    ]
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的地址'
  }

  componentWillMount() {
    // const { addressStore } = this.props
    // const list = addressStore.getList()

    // this.setState({ list })
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {

    const { addressStore } = this.props
    const list = addressStore.getList()

    this.setState({ list: [] }, () => {
      this.setState({ list })
    })
  }

  componentDidHide() { }

  /**
  * 选择收获地址
  */
  chooseLocation = () => {
    Taro.getLocation({
      // 返回可以用于wx.openLocation的经纬度
      type: 'gcj02',
      success: res => {
        const { latitude, longitude } = res
        this.setState({ latitude, longitude })
        Taro.chooseLocation({
          success: res => {
            const { address } = res

            this.setState({ address })
          }
        })
      }
    })
  }

  /**
   * 保存提交
   */
  handleSubmit = () => {
    Taro.navigateTo({
      url: "/pages/Extra/Address/Edit/index?status=add"
    })
  }

  handleAddressEdit = (item) => {
    const { id } = item

    Taro.navigateTo({
      url: `/pages/Extra/Address/Edit/index?status=edit&&id=${id}`
    })
  }

  handleAddressDelete = (item) => {
    const { addressStore } = this.props
    const { id } = item

    addressStore.deleteItem(id)

    const list = addressStore.getList()

    this.setState({ list: [] }, () => {
      this.setState({ list })
    })
  }

  render() {
    const { list = {} as any } = this.state

    return (
      <View className={`page ${prefixCls}`}>
        <View className="page-content">
          {
            list.length ? list.map(x => (
              <Slide
                dataSource={x}
                onEdit={this.handleAddressEdit}
                onDelete={this.handleAddressDelete}
                key={x.id}
              />
            )) :
              <Empty dataSource={['暂无地址信息', '请点击底部按钮添加地址']}>
              </Empty>
          }
        </View>
        <View className="page-footer">
          <XButton type="black"
            size="big"
            block
            onClick={this.handleSubmit
            }>
            <XIcon type='plus2' size={30} right={17} />
            添加地址
          </XButton>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
