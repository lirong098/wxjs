// page/work/pages/leasing_cloud.js
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    qty: 2,
    formData: {
      leasingTypeIndex: 1,
      start_date: '',
      end_date: '',
      dates: '',
      reason: ''
    },
    leasingType: ['年假', '事假', '病假', '调休', '产假', '陪产假', '婚假', '例假', '丧假'],
    imgList: [],
    count: 9,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  formSubmit: function (e) {
    console.log(e)
    console.log(this.data.imgList)
  },
  formReset: function () {},
  typeChange: function (e) {
    console.log(e)
    this.setData({
      'formData.leasingTypeIndex': e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      'formData.start_date': e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      'formData.end_date': e.detail.value
    })
  },
  imgData: function (e) {
    let self = this
    self.setData({
      imgList: e.detail
    })
  }
})