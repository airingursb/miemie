// app.js

const hotapp = require('./utils/hotapp.js')
// hotapp.setDebug(true)

const wilddog = require('./utils/wilddog-weapp-all.js')
const config = {
  syncURL: 'https://miemie.wilddogio.com',
  authDomain: 'miemie.wilddog.com'
}

App({
  onLaunch: () => {
    // 调用 API 从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wilddog.initializeApp(config)
  },
  getUserInfo: cb => {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(this.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
