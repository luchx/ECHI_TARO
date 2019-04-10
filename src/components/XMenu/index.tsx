import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { Count } from '@utils/function';
import XSwiper from '@components/XSwiper';
import XIcon from '@components/XIcon';
import Card from './_components/Card';
import DetailModal from './_components/DetailModal';
import './index.less';

const prefixCls = 'components-menu';

export interface XMenuProps {
  // 菜单侧边栏数据源
  siderData?: Array<any>;
  // 菜单主体列表数据
  contentData: any;
  // 饮品需求数据源
  requireData?: Object;
  // 饮品logo地址
  logoSrc?: string;
  // 点击查看饮品详细
  onClick?: Function;
  // 菜单高度
  height?: string;
  // 轮播图片地址
  swiperSrc?: Array<any>;
}

export interface XMenuState {
  // 侧边栏滚动选择的下标
  siderActvieKey?: Number;
  // 主体滚动选择的下标
  contentActvieKey?: Number;
  // modal是否打开
  isOpened: Boolean;
  // 餐品详情
  detailData: any;
}

class App extends Component<XMenuProps, XMenuState> {
  state = {
    siderActvieKey: -1,
    contentActvieKey: -1,
    // modal是否打开
    isOpened: false,
    // 餐品详情
    detailData: {},
  }

  scrollContentHeightArr = [] as any;
  /**
   * 切换侧边栏
   * @param key 切换的侧边栏的标识
  */
  handleToggle = (key) => {
    this.setState({ siderActvieKey: key, contentActvieKey: key });
    console.info(key)
  }

  /**
   * 关闭modal
   * @params item 被选钟规格的数据
  */
  handleCloseModal = () => {
    this.setState({ isOpened: false })
  }

  /**
    * 点击餐品
    * @params item 被点击的餐品数据
  */
  handleCardClick = (item) => {
    console.info(item)
    this.setState({ detailData: item, isOpened: true })
  }

  /**
   * 主列表触发滚动事件
   * @params data 滚动获取的数据
 */

  onScrollContent = (data) => {
    const { scrollContentHeightArr } = this
    const { scrollTop } = data.detail

    if (!scrollContentHeightArr.length) {
      this.cacleScrollContent().then(arr => {
        this.scrollContentHeightArr = arr
        this.cacleActvieKey(arr, scrollTop)
      })
      return
    }
    this.cacleActvieKey(scrollContentHeightArr, scrollTop)
  }

  /**
   * 计算菜单主体每个菜单组距离菜单顶部高度
   *  */
  cacleScrollContent() {
    const query = Taro.createSelectorQuery().in(this.$scope)

    return new Promise(res => {
      // 节流，是否第一次查询
      let firstTime = null as any

      if (firstTime) {
        return false
      }
      query.select(`.${prefixCls}-content-header`).boundingClientRect()
      query.selectAll(`.${prefixCls}-content-list-team`).boundingClientRect()
      query.exec((rects: any) => {
        firstTime = true

        const [header, listData] = rects
        const contentTop = header.height
        const result = listData.map(x => x.height).map((_x, y, z) => Count(z, y, contentTop))

        res(result)
      })
    })
  }

  cacleActvieKey = (arr, scrollTop = 0) => {
    const { siderActvieKey } = this.state

    const index = arr.findIndex(value => value >= scrollTop)

    if (index !== siderActvieKey) {
      this.setState({ siderActvieKey: index })
    }
  }

  render() {
    const { contentData, siderData, logoSrc, height, swiperSrc, requireData } = this.props;
    const { siderActvieKey, contentActvieKey, isOpened, detailData } = this.state;

    const scrollStyle = {
      height: height || 'auto'
    }
    console.info(detailData, `${prefixCls}-content-list-${siderActvieKey}`, siderActvieKey)

    return (
      <View className={prefixCls}>
        <ScrollView
          style={scrollStyle}
          scrollY
          className={`${prefixCls}-sider`}
        >
          {
            siderData && siderData.map((item, index) => (
              <View
                className={`${prefixCls}-sider-item ${index === siderActvieKey || index === 0 && siderActvieKey === -1 ? `${prefixCls}-sider-item-active` : ''}`}
                onClick={() => { this.handleToggle(index) }}
                key={item.id}
              >
                {item.value}
              </View>
            ))
          }
        </ScrollView>
        <ScrollView
          className={`${prefixCls}-content`}
          style={scrollStyle}
          scrollY
          scrollIntoView={`${prefixCls}-content-list-${contentActvieKey}`}
          scrollWithAnimation
          onScroll={this.onScrollContent}
        >
          <View className={`${prefixCls}-content-inner`}>
            <View className={`${prefixCls}-content-header`}>
              <View className={`${prefixCls}-content-header-banner`}>
                {logoSrc ? <Image src={logoSrc} mode="scaleToFill" /> : ''}
              </View>
              <View className={`${prefixCls}-content-header-swiper`}>
                <XSwiper dataSource={swiperSrc} />
              </View>
            </View>
            <View className={`${prefixCls}-content-list`}>
              {
                contentData && contentData.map((result, index) =>
                  (
                    <View
                      key={result.id}
                      id={`${prefixCls}-content-list-${index}`}
                      className={`${prefixCls}-content-list-team`}
                    >
                      <View className={`${prefixCls}-content-list-title`}>
                        {result.title}<XIcon type='hot' size={[13, 15]} left />
                      </View>
                      {
                        result.list && result.list.map(item => (
                          <Card
                            key={item.id}
                            dataSource={item}
                            onClick={this.handleCardClick}
                          />
                        ))
                      }
                    </View>
                  )
                )
              }
            </View>
          </View>
        </ScrollView>
        <DetailModal
          requireData={requireData}
          dataSource={detailData}
          isOpened={isOpened}
          onClose={this.handleCloseModal}
        ></DetailModal>
      </View>
    )
  }
}

export default App
