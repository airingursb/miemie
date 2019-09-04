// pages/settings/feedback/feedback.js

const wilddog = require('../../../utils/wilddog-weapp-all')
const config = {
  syncURL: 'https://miemie.wilddogio.com',
  authDomain: 'miemie.wilddog.com'
}
const app = getApp()


Page({
  data: {
    userInfo: {},
    content: "",
    connect: ""
  },
  onLoad: options =>  {

    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    })
  },
  getContent: e => {
    this.setData({
      content: e.detail.value
    })
  },
  getConnection: e => {
    this.setData({
      connect: e.detail.value
    })
  },
  getNowFormatDate: () => {
    const date = new Date()
    const seperator1 = "-"
    const seperator2 = ":"
    const month = date.getMonth() + 1
    const strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    return date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds()
  },
  submitSuggestion: () => {
    wilddog.initializeApp(config)
    const ref = wilddog.sync().ref("/web/saving-data/feedback")

    const currentdate = this.getNowFormatDate()
        
    // child() 用来定位到某个节点。
    ref.child(currentdate).set({
      "content": this.data.content,
      "connect": this.data.connect,
      "user": this.data.userInfo.nickName
    })

    wx.showModal({
      title: '提示',
      content: '提交成功！感谢您的反馈！',
      showCancel: false
    })
  }
})
