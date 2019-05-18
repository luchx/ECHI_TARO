import Taro from '@tarojs/taro'

export default function getUserInfo() {
  // Taro.getSetting({
  //   success(res) {
  //     if (!res.authSetting['scope.userInfo']) {
  //       Taro.authorize({
  //         scope: 'scope.userInfo',
  //         success() {
  //           // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
  //           Taro.getUserInfo().then(data=>{
  //             console.info(data)
  //           })
  //         }
  //       })
  //     }
  //   }
  // })
  // Taro.getSetting({
  //   success(res) {
  //     if (!res.authSetting['scope.record']) {
  //       Taro.authorize({
  //         scope: 'scope.userInfo',
  //         success() {
  //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //           Taro.startRecord()
  //         }
  //       })
  //     }
  //   }
  // })
  return;
  // 验证用户是否登陆
  Taro.checkSession().then(data => {
    console.info(data, 8889)
  }).catch(() => {
    // 未登陆，即开始登陆
    Taro.login()
    // Taro.login().then(data=>{
    //   console.info(data)
    //   Taro.getUserInfo().then(data=>{
    //     console.info(data)
    //   })
    // })
  })
}
