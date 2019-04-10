import Taro, { Component } from '@tarojs/taro'
import { Image } from '@tarojs/components'
import hotSrc from '@images/hot.png'
import plusSrc from '@images/plus.png'
import plus2Src from '@images/plus-2.png'
import reduceSrc from '@images/reduce.png'
import closeSrc from '@images/close.png'
import editSrc from '@images/edit.png'
import './index.less';

const prefixCls = 'components-icon';

const typeList = {
  hot: hotSrc,
  plus: plusSrc,
  plus2: plus2Src,
  reduce: reduceSrc,
  close: closeSrc,
  edit: editSrc
}

export interface XSwiperProps {
  // 图标指定
  type?: any;
  // 大小
  size?: any;
  // 左边距
  left?: number | boolean;
  // 右边距
  right?: number | boolean;
}

class App extends Component<XSwiperProps> {

  getSize = (size) => {
    let width = 0;
    let height = 0;

    if (Object.prototype.toString.call(size) === "[object Array]" && size.length === 2) {
      [width, height] = size
    }
    if (Object.prototype.toString.call(size) === "[object Number]") {
      width = size
      height = size
    }

    return [width, height]
  }

  getGutter = (gutter) => {
    let result = 0
    if (Object.prototype.toString.call(gutter) === "[object Boolean]") {
      result = 5
    }
    if (Object.prototype.toString.call(gutter) === "[object Number]") {
      result = gutter
    }
    return result
  }

  render() {
    const { type, size, left, right } = this.props;

    const [width, height] = this.getSize(size)

    const magrinLeft = this.getGutter(left);
    const magrinRight = this.getGutter(right);

    const style = `width: ${width}rpx; height: ${height}rpx;
    margin-left:${magrinLeft}rpx;
    margin-right:${magrinRight}rpx`

    return (
      <Image className={prefixCls} style={style} src={typeList[type]} />
    )
  }
}

export default App
