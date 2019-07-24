import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import XIcon from '@components/XIcon'
import './index.less'

const prefixCls = 'page-address-slide';

export interface SlideProps {
  // 数据
  dataSource?: any;
  // 删除事件
  onDelete?: Function;
  // 编辑事件
  onEdit?: Function;
}

export default class Index extends Component<SlideProps> {

  static defaultProps = {
    dataSource: {},
    onDelete: () => { },
    onEdit: () => { },
  }

  state = {
    // 元素在水平方形移动的长度，单位为px
    translateX: 0,
    animate: false
  }
  // 单位为px;px/2=rpx
  max = 0
  // 手指触摸动作开始pagex坐标
  touchStartX = 0
  // 上一次touch移动的长度
  moveX = 0

  componentDidMount() {
    this.getMax()
  }

  getMax = () => {
    const query = Taro.createSelectorQuery().in(this.$scope)
    query.select(`.${prefixCls}-delete`).boundingClientRect().exec((rect: any) => {
      const [data] = rect

      if (!data) {
        return
      }

      const { width } = data

      if (width) {
        this.max = width
      }
    })
  }

  onTouchStart = (ev) => {
    const { pageX } = ev.touches[0]

    this.setState({ animate: false })

    this.touchStartX = pageX
  }

  onTouchMove = (ev) => {
    const { touchStartX, max, moveX } = this
    const { pageX } = ev.touches[0]

    const translateX = pageX - touchStartX

    // 这次touch移动的长度 +  上次touch移动的长度
    const result = translateX + moveX
    // 移动的长度大于最大值 或从 初始位置向右移动
    if (Math.abs(result) > max || result > 0) {
      return
    }


    this.setState({ translateX: result })
  }

  onTouchEnd = () => {
    const { max } = this
    const { translateX } = this.state

    let x = max
    // 滑动超过max的一半，复原
    if (Math.abs(translateX) <= (max / 2)) {
      this.setState({ translateX: 0, animate: true })
      this.moveX = 0
      return
    }
    if (Math.sign(translateX) === -1) {
      x = -(max)
    }

    this.setState({ translateX: x, animate: true })
    this.moveX = x
  }

  /**
   * 编辑地址
  */
  handleEdit = () => {
    const { dataSource, onEdit } = this.props

    onEdit && onEdit(dataSource)
  }

  /**
   * 删除地址
  */
  handleDelete = () => {
    const { dataSource, onDelete } = this.props

    onDelete && onDelete(dataSource)
  }

  render() {
    const { dataSource } = this.props
    const { translateX, animate } = this.state
    const wrapClassName = classnames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-animate`]: animate,
    })
    const defaultIconClassName = classnames({
      [`${prefixCls}-content-read-bottom-default-icon`]: true,
      [`none`]: !Boolean(dataSource.isDefaultAddress),
    })
    const style = `transform: translateX(${translateX * 2}rpx)`

    return (
      <View
        className={wrapClassName}
        style={style}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <View className={`${prefixCls}-content`}>
          <View className={`${prefixCls}-content-read`}>
            <View className={`${prefixCls}-content-read-top`}>
              <View className={`${prefixCls}-content-read-top-name`}>
                {dataSource.name}
              </View>
              <View className={`${prefixCls}-content-read-top-phone`}>
                {dataSource.phone}
              </View>
            </View>
            <View className={`${prefixCls}-content-read-bottom`}>
              <View className={defaultIconClassName}>
                默认
            </View>
              {dataSource.address}{dataSource.addressDetail}
            </View>
          </View>
          <View className={`${prefixCls}-content-edit`} onClick={this.handleEdit}>
            <XIcon type='edit' size={[30, 28]} />
          </View>
        </View>
        <View className={`${prefixCls}-delete`} onClick={this.handleDelete}>
          删除
            </View>
      </View>
    )
  }
}
