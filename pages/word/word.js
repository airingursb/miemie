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

  onLoad: () => {
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

  show: () => {
    this.setData({
      showNot: true
    })
  },

  next: () => {
    this.setData({
      showNot: false
    })

    const { vocListMax, content, audioUrl } = this.data

    // 从vocabulary.js中选取下一个单词
    let idx = Math.floor(Math.random() * vocListMax) + 1
    this.setData({
      content: vocList.wordList[idx],
    })

    wx.request({
      url: `https://api.shanbay.com/bdc/search/?word=${content}`,
      data: {},
      method: 'GET',
      success: res => {

        const data = res.data.data

        this.setData({
          content: data.content,
          audioUrl: data.us_audio,
          pron: data.pron,
          definition: data.definition
        })
        innerAudioContext.src = audioUrl
      }
    })
  },

  read: () => {
    if (this.data.audioUrl) {
      innerAudioContext.play()
    }
  }
})
