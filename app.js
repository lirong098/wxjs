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
      // 如有openId则返回
      callback(null, self.globalData.openid, self.globalData.session_key)
    } else {
      // 如没有则调用wxLogin获取code
      wxLogin().then(data => {
        // console.log(data, 'loginData')
        // 根据code调用后端openIdUrl接口获取用户的openID，session_key
        return getRequest(openIdUrl, { code: data.code })
      }, err => {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        callback(err)
      }).then(res => {
        // console.log('拉取openid成功', res)
        self.globalData.openid = res.data.openid
        self.globalData.session_key = res.data.session_key
        // 接口openIdUrl获取成功，则返回
        callback(null, self.globalData.openid, self.globalData.session_key)
      }, err => {
        // console.log('接口openIdUrl获取失败，将无法正常使用开放接口等服务', res)
        callback(err)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  // 获取微信用户信息
  getUserInfo: function (callback) {
    let self = this
    // 调用getUserOpenId
    self.getUserOpenId((err, openId = null, session_key = null) => {
      // 如果有 err 为 null 说明成功获取 openId
      if (err === null) {
        // wxGetUserInfo 是 让用户授权，获取微信用户的信息
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
            // 获取用户信息成功则访问后端 loginUrl 接口
            return getRequest(loginUrl, data)
          },
          err => {})
        .then(
          res => {
            // 后端 loginUrl 接口成功则保存用户信息
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
  // 获取数据库用户信息
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
        // 适合用于小程序首次加载调用
        // 查看本地缓存的 OPENID 是否存在
        self.globalData.openid = wx.getStorageSync('OPENID')
        if (!self.globalData.openid) {
          // OPENID 不存在 则调用获取微信用户信息（不仅获取微信用户信息，还需要用户登录授权等流程）
          self.getUserInfo((res) => {
            resolve(res)
          })
        } else {
          // OPENID 存在 则调用获取数据库用户信息（根据openId在数据库中查找用户信息）
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
