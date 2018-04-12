// page/common/components/uploader_img/uploader_img.js
const dwRequest = require('../../../../util/dw-request.js')
const openIdUrl = require('../../../../config.js').openIdUrl
const getRequest = dwRequest.getRequest
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageList: {
      type: Array,
      value: []
    },
    count: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    arr: []
  },
  attached: function () {
    //   getRequest(openIdUrl, { code: '223' }).then(res => {
    //       console.log(res)
    //   }).catch(err => {
    //       console.log('ds', err)
    //       this.setData({
    //           arr: ['1', '2', '3']
    //       })
    //   })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgChange: function (newVal, oldVal) {
        console.log('fdf', newVal)
      this.triggerEvent('getImgData', newVal)
    },
    chooseImage: function () {
      var that = this
      wx.chooseImage({
        count: this.data.count,
        success: function (res) {
          // that.setData({
          //   imageList: res.tempFilePaths
          // })
          that.imgChange(res.tempFilePaths, that.data.imageList)
        }
      })
    },
    previewImage: function (e) {
      console.log(e.target.dataset.src)
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: this.data.imageList
      })
    }
  }
})
