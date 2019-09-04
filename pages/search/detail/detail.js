// pages/settings/detail/detail.js
Page({
  data: {},
  onLoad: option => {
    const word = option.content

    wx.request({
      url: `https://api.shanbay.com/bdc/search/?word=${word}`,
      data: {},
      method: 'GET',
      success: res => {
        const data = res.data.data
        this.setData({
          content: data.content,
          audio: data.audio_addresses.us[0],
          pron: data.pron,
          definition: data.definition
        })
      }
    })
  }
})
