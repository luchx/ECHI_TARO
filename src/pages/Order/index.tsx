import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import XSwitch from '@components/XSwitch'
import XTabs from '@components/XTabs'
import XModal from '@components/XModal'
import { getOrderList } from '@apis/order'
import Drink from './Detail/Drink'
import Meal from './Detail/Meal'
import './index.less'

const prefixCls = 'page-order'

class Index extends Component {

  state = {
    tabsKey: 1,
    switchKey: 1,
    // 饮品/套餐模态框 显示/隐藏
    isOpened: false,
    // 菜单高度
    menuHeight: null,
    menuData: {
      siderData: [
        { id: 1, value: '今日推荐' },
        { id: 2, value: 'YITO森林' },
        { id: 3, value: '水母家族' },
        { id: 4, value: '今日推荐' },
        { id: 5, value: 'YITO森林' },
        { id: 6, value: '水母家族' },
        { id: 7, value: '今日推荐' },
        { id: 8, value: 'YITO森林' },
        { id: 9, value: '水母家族' },
      ],
      logoSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559306415426&di=45afbd8b08abe9548dd8763fcd231bfa&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201801%2F16%2F001613ga63zcpop3pomkkb.jpg",
      swiperSrc: [
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=971903522,2055241417&fm=26&gp=0.jpg',
        'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg',
        'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg'
      ],
      contentData: [
        {
          id: 1, title: '今日推荐', list: [
            { id: 1, name: "蔷薇红梅气泡", count: 2, price: 50, requireType: [1, 2], description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
          ]
        },
        {
          id: 2, title: 'YITO森林', list: [
            { id: 2, title: '制作中', name: "蓝玫瑰红梅气泡", count: 2, price: 20, requireType: [1], description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
            { id: 3, title: '正在配送', name: "蔷薇红梅气泡", count: 2, price: 50, requireType: [1, 2, 3], description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
            { id: 4, title: '制作中', name: "蓝玫瑰红梅气泡", count: 2, price: 20, requireType: [1, 2], description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
          ]
        },
        {
          id: 2, title: '水母家族', list: [
            { id: 2, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 30, requireType: [], description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
            { id: 3, title: '正在配送', name: "蔷薇红梅气泡2", count: 2, price: 40, requireType: [1], description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
            { id: 4, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 35, requireType: [2], description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
            { id: 2, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 30, requireType: [3], description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
            { id: 3, title: '正在配送', name: "蔷薇红梅气泡2", count: 2, price: 40, requireType: [1, 3], description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
            { id: 4, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 35, requireType: [2, 3], description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
          ]
        }
      ],
      requireData: [
        {
          type: 1, field: 'space', title: "规格", list: [
            { value: 1, label: '三分钟气泡' },
            { value: 2, label: '五分钟气泡' },
          ]
        },
        {
          type: 2, field: 'temperature', title: "温度", list: [
            { value: 1, label: '正常冰(推荐)' },
            { value: 2, label: '少冰' },
            { value: 3, label: '少少冰' },
            { value: 4, label: '去冰' },
            { value: 5, label: '多冰' },
            { value: 6, label: '不加冰' },
          ]
        },
        {
          type: 3, field: 'sugar', title: "糖度", list: [
            { value: 1, label: '正常糖(推荐)' },
            { value: 2, label: '少糖' },
            { value: 3, label: '少少糖' },
            { value: 4, label: '去糖' },
            { value: 5, label: '多糖' },
            { value: 6, label: '不加糖' },
          ]
        }
      ]
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    // navigationBarTitleText: ''
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
    // this.getList()
    const query = Taro.createSelectorQuery().in(this.$scope)

    query.select('.page-content-menu').boundingClientRect()

    query.exec(res => {
      const { top } = res[0]

      const menuHeight = `calc(100vh - ${top * 2}rpx)`

      this.setState({ menuHeight })
    })
  }

  componentWillUnmount() { }

  componentDidShow() {
    // 页面显示 默认自取
    const { switchKey } = this.state

    if (switchKey === 2) {
      this.setState({ switchKey: 1 })
    }
  }

  componentDidHide() { }


  getList = () => {
    getOrderList().then(data => {
      const { result } = data

      this.setState({ menuData: result })
    })
  }

  /**
   * 切换开关
   * @param {number} key 切换的开关的标识
  */
  handleXSwitchChange = (key) => {
    this.setState({ switchKey: key }, () => {
      key === 2 && Taro.navigateTo({
        url: '/pages/Extra/Address/List/index'
      })
    })
  }

  /**
   * 切换标签页
   * @param key 切换的开关的标识
   * @param boolean 是否关闭 自取/外卖 模态框
  */
  handleXTabsClick = (tabsKey, boolean) => {
    const { isOpened } = this.state

    if (isOpened !== boolean) {
      this.setState({ isOpened: boolean })
    }

    this.setState({ tabsKey })
  }

  render() {
    const { menuData, tabsKey, isOpened, switchKey, menuHeight } = this.state

    return (
      <View className={`page ${prefixCls}`}>
        <View className="page-header">
          <View className="page-header-content">
            星光大道店 >
          </View>
          <XSwitch
            dataSource={[{ id: 1, value: '自取' }, { id: 2, value: '外卖' }]}
            onChange={this.handleXSwitchChange}
            activeKey={switchKey}
          />
        </View>
        <View className="page-content">
          <XTabs
            dataSource={[{ id: 1, value: '生酮饮品' }, { id: 2, value: '生酮套餐' }]}
            activeKey={tabsKey}
            onChange={this.handleXTabsClick}
          />
          <View className={`${tabsKey === 1 ? '' : 'hidden'} flex-column page-content-menu`}>
            <Drink
              height={menuHeight}
              dataSource={menuData}
            />
          </View>
          <View className={`${tabsKey === 2 ? '' : 'hidden'} flex-column`}>
            <Meal />
          </View>
        </View>
        <XModal isOpened={isOpened}>
          <View className={`${prefixCls}-modal-switch`}>
            <View
              className={`${prefixCls}-modal-switch-left`}
              onClick={() => { this.handleXTabsClick(1, false) }}
            >饮品</View>
            <View
              onClick={() => { this.handleXTabsClick(2, false) }}
            >套餐</View>
          </View>
        </XModal>
      </View>
    )
  }
}

export default Index as ComponentType
