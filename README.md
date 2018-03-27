# wxjs

> 该项目是微信小程序的Demo

## 项目结构

项目结构参照[weui组件](https://github.com/Tencent/weui)的分包设置，在此基础上修改。

## 项目包括

* 用户授权登录逻辑
* 将wx.request、wx.login、wx.getUserInfo、wx.getSystemInfo封装成Promise对象，实现链式操作
* 自定义组件使用
* weui样式使用

## 用户授权登录

此项目的用户授权登录逻辑，按照实际项目写的，需配合后端接口获取用户openId、解密用户数据。
后端我用的PHP、mysql。[后端代码示例](https://github.com/lirong098/wxphp)
