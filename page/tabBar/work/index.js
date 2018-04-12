const paymentUrl = require('../../../config').paymentUrl

var app = getApp()
console.log(app.globalData.openid)
Page({
  data: {
    list: [
      {
        id: 'leasing_cloud',
        name: '请假单',
        url: 'leasing_cloud',
        test: ''
      },
      {
          id: 'test',
          name: '测试组件传值',
          url: 'test',
          test: ''
      }
    ]
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(app.globalData.openid)
    // if (!app.globalData.openid || app.globalData.openid === null) app.getUserInfo()
    let self = this
    // app.index().then(res => {
    //   self.setData({
    //     test: res.open_id
    //   })
    // })
  },
  kindToggle: function (e) {
    console.log(e)
  }
})

