// miniprogram/pages/cook/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    template: [],
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      templates: app.globalData.template
    })

    if (app.globalData.cook) {
      this.getCook()
    } else {
      app.getCookCallback = this.getCook
      app.getCook()
    }
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

  getCook: function () {
    const detail = app.globalData.cook.filter(item => item._id === this.data.id)[0]
    const template = this.data.templates.filter(item => item.type === detail.type)[0].options
    const multi = template.filter(item => item.type === 'multiText')
    multi.forEach(item => {
      if (typeof detail.data[item.name] === 'string') {
        detail.data[item.name] = detail.data[item.name].split(',')
      }
    })
    this.setData({
      detail,
      template
    })
  },

  onDelCook: function () {
    wx.showModal({
      title: '温馨提示',
      content: `你确定要删除本记录吗？`,
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            mask: true
          })
          app.setCook({
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
      }
    })
  }
})