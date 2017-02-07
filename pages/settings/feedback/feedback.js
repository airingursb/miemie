// pages/settings/feedback/feedback.js

var wilddog = require('../../../utils/wilddog-weapp-all')
var config = {
  syncURL: 'https://miemie.wilddogio.com',
  authDomain: 'miemie.wilddog.com'
}
var app = getApp()


Page({
  data: {
    userInfo: {},
    content: "",
    connect: ""
  },
  onLoad: function (options) {

    const that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  getContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  getConnection: function (e) {
    this.setData({
      connect: e.detail.value
    })
  },
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
    return currentdate;
  },
  submitSuggestion: function () {
    wilddog.initializeApp(config)
    var ref = wilddog.sync().ref("/web/saving-data/feedback");
    // child() 用来定位到某个节点。

    var currentdate = this.getNowFormatDate()
    ref.child(currentdate).set({
      "content": this.data.content,
      "connect": this.data.connect,
      "user": this.data.userInfo.nickName
    });

    wx.showModal({
      title: '提示',
      content: '提交成功！感谢您的反馈！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
  
})