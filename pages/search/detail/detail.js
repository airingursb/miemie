// pages/settings/detail/detail.js
Page({
  data:{},
  onLoad:function(option){
    var word = option.content

    var that = this;
        wx.request({
            url: 'https://api.shanbay.com/bdc/search/?word=' + word,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res)
                that.setData({
                    content: res.data.data.content,
                    audio: res.data.data.audio_addresses.us[0],
                    pron: res.data.data.pron,
                    definition: res.data.data.definition
                })
            },
            fail: function () {
            },
            complete: function () {
            }
        })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})