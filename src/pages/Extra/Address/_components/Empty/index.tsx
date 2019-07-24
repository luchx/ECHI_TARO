import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
import { View } from '@tarojs/components'
import { unique } from '@utils/function'
import './index.less'

const prefixCls = 'page-address-empty';

export interface SlideProps {
  // 数据
  dataSource?: any;
}

export default class Index extends Component<SlideProps> {

  static defaultProps = {
    dataSource: [],
  }

  state = {
  }

  componentDidMount() {}


  render() {
    const { dataSource } = this.props

    const wrapClassName = classnames({
      [`${prefixCls}`]: true,
    })

    return (
      <View
        className={wrapClassName}
      >
        {
          dataSource.length && dataSource.map(x=>
            <View className={`${prefixCls}-text`} key={unique()}>{x}</View>
          )
        }
      </View>
    )
  }
}
