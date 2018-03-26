function dwPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data = {}) {
  var getRequest = dwPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data = {}) {
  var postRequest = dwPromisify(wx.request)
  return postRequest({
    url: url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}

/**
 * 空方法
 */
function doThen(fn) {
  return dwPromisify(fn)
}

/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return dwPromisify(wx.login)()
}

/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return dwPromisify(wx.getUserInfo)()
}

/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  return dwPromisify(wx.getSystemInfo)
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
  doThen: doThen,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo
}