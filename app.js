const openIdUrl = require('./config').openIdUrl
const loginUrl = require('./config').loginUrl
const userUrl = require('./config').userUrl
const dwRequest = require('./util/dw-request.js')
const wxLogin = dwRequest.wxLogin
const wxGetUserInfo = dwRequest.wxGetUserInfo
const getRequest = dwRequest.getRequest
App({
  onLaunch: function (opts) {},
  onShow: function (opts) {
    // console.log('App Show', opts)
  },
  onHide: function () {
    // console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    session_key: null,
    userData: {}
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this
    if (self.globalData.openid) {
      callback(null, self.globalData.openid, self.globalData.session_key)
    } else {
      wxLogin().then(data => {
        console.log(data, 'loginData')
        return getRequest(openIdUrl, { code: data.code })
      }, err => {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        callback(err)
      }).then(res => {
        console.log('拉取openid成功', res)
        self.globalData.openid = res.data.openid
        self.globalData.session_key = res.data.session_key
        callback(null, self.globalData.openid, self.globalData.session_key)
      }, err => {
        console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
        callback(err)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  getUserInfo: function (callback) {
    let self = this
    self.getUserOpenId((err, openId = null, session_key = null) => {
      if (err === null) {
        wxGetUserInfo()
        .then(
          res => {
            let data = {
              openid: openId,
              session_key: session_key,
              rawData: res.rawData,
              signature: res.signature,
              iv: res.iv,
              encryptedData: res.encryptedData
            }
            return getRequest(loginUrl, data)
          },
          err => {})
        .then(
          res => {
            self.setUserData(res.data.userData, callback)
          }
        )
        .catch(err => {
          console.log(err)
          if (typeof callback === 'function') callback(null)
        })
      }
    })
  },
  getUserData: function (callback) {
    let self = this
    getRequest(userUrl, { open_id: self.globalData.openid }).then(res => {
      if (res.statusCode === 200) self.setUserData(res.data, callback)
    })
  },
  setUserData: function (userData, callback) {
    let self = this
    self.globalData.userData = userData
    self.globalData.openid = userData.open_id
    try {
      wx.setStorageSync('OPENID', userData.open_id)
      if (typeof callback === 'function') callback(userData)
    } catch (e) {
      if (typeof callback === 'function') callback(null)
    }
  },
  // 提供其他页面获取用户信息的函数
  index: function () {
    return new Promise((resolve, reject) => {
      let self = this
      try {
        self.globalData.openid = wx.getStorageSync('OPENID')
        if (!self.globalData.openid) {
          self.getUserInfo((res) => {
            resolve(res)
          })
        } else {
          self.getUserData((res) => {
            resolve(res)
          })
        }
      } catch (err) {
        reject(err)
      }
    })
  }
})
