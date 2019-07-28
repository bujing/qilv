// pages/cook/index.js
import utils from '../../utils/index'

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
    app.getCookCallback = this.getCook
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
    if (!app.globalData.cook) {
      app.getCook()
    }
    if (!app.globalData.template) {
      app.getTemplate()
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

  getCook: function () {
    const list = app.globalData.cook.map(item => {
      item.timestamp = utils.dateFormat(new Date(item.timestamp).getTime(), 'yyyy年MM月dd日')
      return item
    })
    this.setData({
      list
    })
  }
})