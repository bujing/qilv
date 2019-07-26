// miniprogram/pages/diary/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    template: {
      diary: {
        title: '日记',
        options: [
          {
            name: 'title',
            label: '标题',
            placeholder: '日记标题',
            type: 'text'
          },
          {
            name: 'date',
            label: '日期',
            type: 'picker'
          },
          {
            name: 'weather',
            label: '天气',
            type: 'text'
          },
          {
            name: 'mood',
            label: '心情',
            type: 'text'
          },
          {
            name: 'content',
            label: '正文',
            type: 'editor'
          }
        ]
      }
    },
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const detail = app.globalData.diary.filter(item => item._id === options.id)[0]
    this.setData({
      detail,
      id: options.id
    })
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
  onShareAppMessage: function () {

  },

  onDelDiary: function () {
    wx.showLoading({
      mask: true
    })
    app.setDiary({
      template: this.data.detail.template,
      data: this.data.detail.data,
      id: this.data.id,
      delete: true
    }).then(() => {
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        mask: true,
        title: '删除成功！'
      })

      setTimeout(() => {
        wx.switchTab({
          url: './index'
        })
      }, 500)
    })
  }
})