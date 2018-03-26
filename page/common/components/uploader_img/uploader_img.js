// page/common/components/uploader_img/uploader_img.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgChange: function (newVal, oldVal) {
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
