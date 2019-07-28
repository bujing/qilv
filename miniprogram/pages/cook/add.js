// miniprogram/pages/cook/add.js
import utils from '../../utils/index'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    template: [],
    content: null,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let detail = {}
    let type = 0
    if (options.id) {
      detail = app.globalData.cook.filter(item => item._id === options.id)[0]
      type = app.globalData.template.findIndex(item => item.type === detail.type)
    }
    const today = detail.data && detail.data.date ? detail.data.date : utils.dateFormat(new Date().getTime(), 'yyyy年MM月dd日')
    this.setData({
      today,
      detail,
      type,
      id: options.id || '',
      templates: app.globalData.template
    })

    this.onTemplateChange(type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  onTypeChange: function (res) {
    this.setData({
      type: res.detail.value
    })
    this.onTemplateChange(res.detail.value)
  },

  onTemplateChange: function (type) {
    this.setData({
      template: this.data.templates[type].options
    })
  },

  onDateChange: function (res) {
    this.setData({
      today: utils.dateFormat(new Date(res.detail.value).getTime(), 'yyyy年MM月dd日')
    })
  },

  onEditorReady: function () {
    if (this.data.detail.data) {
      wx.createSelectorQuery().select('#editor').context(res => {
        res.context.setContents({
          ...this.data.detail.data.content
        })

        this.setData({
          content: this.data.detail.data.content
        })
      }).exec()
    }
  },

  onEditorInput: function (event) {
    const { html, text, delta } = event.detail
    this.setData({
      content: {
        html,
        text,
        delta
      }
    })
  },

  onFormSubmit: function (event) {
    const { id, type, content, template, templates } = this.data
    const data = {
      ...event.detail.value,
      content
    }

    for (let item of template) {
      if (item.require && !data[item.name]) {
        wx.showToast({
          icon: 'none',
          title: `请填写${item.label}信息！`
        })
        return false
      }
    }

    wx.showLoading({
      mask: true
    })
    app.setCook({
      type: templates[type].type,
      data,
      id
    }).then(() => {
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        mask: true,
        title: '保存成功！'
      })

      setTimeout(() => {
        wx.switchTab({
          url: './index'
        })
      }, 500)
    })
  }
})