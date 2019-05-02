import { ComponentType } from 'react'
import { observer, inject } from '@tarojs/mobx'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Switch } from '@tarojs/components'
import XForm from '@components/XForm/Form'
import XFormItem from '@components/XForm/FormItem'
import XButton from '@components/XButton'
import { phoneReg } from '@utils/regularConfig'
import './index.less'

const prefixCls = 'page-address';
export interface EditAddressProps {
  // 唯一编码
  id?: any;
  // mobx 地址数据
  addressStore?: any
}
@inject('addressStore')
@observer
class EditAddress extends Component<EditAddressProps> {

  state = {
    // 手机
    phone: "",
    // 姓名
    name: "",
    // 收货地址
    address: '',
    // 收货详细地址
    addressDetail: '',
    // 默认地址
    isDefaultAddress: false,
    // 唯一编码
    id: null
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '新增地址'
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
    const { status, id } = this.$router.params

    const { addressStore } = this.props

    const { phone, name, address, addressDetail, isDefaultAddress } = addressStore.getItem(id)

    this.setState({
      phone, name, address, addressDetail, isDefaultAddress, id
    })

    if (!status) {
      return
    }
    if (status === 'edit') {
      Taro.setNavigationBarTitle({
        title: '修改地址'
      })
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
  * 选择收获地址
  */
  chooseLocation = () => {
    Taro.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success: () => {
        Taro.chooseLocation({
          success: res => {
            const { address } = res

            this.setState({ address })
          }
        })
      }
    })
  }

  handleChange = (e, key) => {
    const { value } = e.detail
    this.setState({ [key]: value })
  }

  /**
   * 保存提交
   */
  handleSubmit = () => {
    const { addressStore } = this.props
    const { id, phone, name, address, addressDetail, isDefaultAddress } = this.state
    const tipsKey = ['name', 'phone', 'address', 'addressDetail']
    const tipsTxt = {
      name: "收货人",
      phone: "手机号码",
      address: "收货地址",
      addressDetail: "详细地址",
    }

    let isContinue = false

    for (let key of tipsKey) {
      if (!this.state[key]) {
        Taro.showToast({
          title: `${tipsTxt[key]}不能为空`,
          icon: 'none',
          duration: 2000
        })
        isContinue = true
        break
      }
    }

    if (isContinue) {
      return
    }

    if (!phoneReg.test(phone)) {
      Taro.showToast({
        title: '请填写正确的中国大陆地区手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }

    addressStore.saveItem({ id, phone, name, address, addressDetail, isDefaultAddress })
    Taro.navigateBack()
  }

  render() {
    const { phone, name, address, addressDetail, isDefaultAddress } = this.state
    return (
      <View className={`page ${prefixCls}`}>
        <View className="page-content">
          <View className="page-content-top">
            <XForm>
              <XFormItem>
                <Input placeholder="收货人" value={name} onInput={(e) => { this.handleChange(e, 'name') }}></Input>
              </XFormItem>
              <XFormItem>
                <Input placeholder="手机号码" type="number" value={phone} onInput={(e) => { this.handleChange(e, 'phone') }}></Input>
              </XFormItem>
              <XFormItem>
                <View className={`${prefixCls}-location`} onClick={this.chooseLocation}>
                  <View className={`${prefixCls}-location-content`}>
                    {address ? address :
                      <View className='placeholder'>收货地址</View>
                    }
                  </View>
                  <View className={`${prefixCls}-location-extra`}>
                    选择
                </View>
                </View>
              </XFormItem>
              <XFormItem border={false}>
                <Input value={addressDetail} onInput={(e) => { this.handleChange(e, 'addressDetail') }} placeholder="详细地址：如道路、门牌号、小区、楼栋号等"></Input>
              </XFormItem>
            </XForm>
          </View>
          <XFormItem title="设置为默认地址"  >
            <View className={`${prefixCls}-switch`}>
              <Switch color="#f8d0b7" checked={isDefaultAddress} onChange={(e) => { this.handleChange(e, 'isDefaultAddress') }} />
            </View>
          </XFormItem>
        </View>
        <View className="page-footer">
          <XButton type="black" size="big" block onClick={this.handleSubmit}>保存</XButton>
        </View>
      </View>
    )
  }
}

export default EditAddress as ComponentType
