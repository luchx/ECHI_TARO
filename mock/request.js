const request = [
  {
    type: 'post', url: 'getName', data: {
      status: 0,
      result: {
        name: '小明',
        age: '41'
      }
    }
  },
  {
    type: 'post', url: 'getOrderList', data: {
      status: 0,
      result: {
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
              { id: 1, name: "蔷薇红梅气泡", count: 2, price: 50, time: '15：30', description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
            ]
          },
          {
            id: 2, title: 'YITO森林', list: [
              { id: 2, title: '制作中', name: "蓝玫瑰红梅气泡", count: 2, price: 20, time: '15：30', description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
              { id: 3, title: '正在配送', name: "蔷薇红梅气泡", count: 2, price: 50, time: '15：30', description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
              { id: 4, title: '制作中', name: "蓝玫瑰红梅气泡", count: 2, price: 20, time: '15：30', description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
            ]
          },
          {
            id: 2, title: '水母家族', list: [
              { id: 2, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 30, time: '15：30', description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
              { id: 3, title: '正在配送', name: "蔷薇红梅气泡2", count: 2, price: 40, time: '15：30', description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
              { id: 4, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 35, time: '15：30', description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
              { id: 2, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 30, time: '15：30', description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
              { id: 3, title: '正在配送', name: "蔷薇红梅气泡2", count: 2, price: 40, time: '15：30', description: '酸甜的草莓与清爽气泡的邂逅，配以淡淡的柠檬分子球。', src: 'http://img1.imgtn.bdimg.com/it/u=4229885950,3469296745&fm=11&gp=0.jpg', },
              { id: 4, title: '制作中', name: "蓝玫瑰红梅气泡2", count: 2, price: 35, time: '15：30', description: '加冰+5分钟气泡', src: 'http://img1.imgtn.bdimg.com/it/u=4145206504,1491730429&fm=26&gp=0.jpg' },
            ]
          }
        ]
      }
    }
  }
]

module.exports = request
