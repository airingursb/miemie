const list = require('../../data/word-list.js')
const vocList = require('../../data/vocabulary.js')
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    content: null,
    pron: null,
    definition: null,
    audioUrl: null,
    worldListMax: 999,
    vocListMax: 12346
  },

  onLoad: function(options) {
    //从本地缓存单词表选取第一个单词
    var idx = Math.floor(Math.random() * this.data.worldListMax) + 1
    var word = list.wordList[idx]

    this.setData({
      content: word.content,
      pron: word.pron,
      definition: word.definition,
      audioUrl: null
    })
  },

  show: function() {
    this.setData({
      showNot: true
    })
  },

  next: function() {
    this.setData({
      showNot: false
    })

    //从vocabulary.js中选取下一个单词
    var idx = Math.floor(Math.random() * this.data.vocListMax) + 1
    this.setData({
      content: vocList.wordList[idx],
    })

    var that = this;
    wx.request({
      url: 'https://api.shanbay.com/bdc/search/?word=' + that.data.content,
      data: {},
      method: 'GET',
      success: function(res) {
        console.log(res)
        that.setData({
          content: res.data.data.content,
          audioUrl: res.data.data.us_audio,
          pron: res.data.data.pron,
          definition: res.data.data.definition
        })
        innerAudioContext.src = that.data.audioUrl
      },
      fail: function() {},
      complete: function() {}
    })
  },

  read: function() {
    if (this.data.audioUrl) {
      console.log(this.data.audioUrl)
      innerAudioContext.play()
    }
  }
})