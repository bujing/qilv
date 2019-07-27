// pages/diary/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getDiaryCallback = this.getDiary
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
    if (!app.globalData.diary) {
      app.getDiary()
    }
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

  getDiary: function () {
    this.setData({
      list: app.globalData.diary
    })
  }
})