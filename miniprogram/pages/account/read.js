// miniprogram/pages/account/read.js
import utils from '../../utils/index'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 按日、月、年模式看账
    viewMode: ['day', 'month', 'year'],
    mode: 'day',
    // 按收入、支出类型看账
    type: 0,
    daily: [[], []],
    monthly: [[], []],
    yearly: [[], []],
    all: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let date = utils.dateFormat(new Date().getTime(), 'yyyy-MM-dd')
    let [year, month, day] = date.split('-')
    this.setData({
      year,
      month,
      day
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
    this.getAccount()
    this.getCategory()

    app.getAccountCallback = this.getAccount
    app.getCategoryCallback = this.getCategory
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

  /**
   * 更新账单信息
   */
  getAccount: function () {
    let { account, income } = app.globalData
    if (!account) return false
    let { daily, monthly, yearly } = this.data
    daily = [account.daily, income.daily]
    monthly = [account.monthly, income.monthly]
    yearly = [account.yearly, income.yearly]
    this.setData({
      daily,
      monthly,
      yearly
    })
  },

  /**
   * 更新类型信息
   */
  getCategory: function () {
    let { category } = app.globalData
    if (!category) return false
    this.setData({
      all: category.all
    })
  },

  /**
   * 改变视图类型
   */
  onModeChange: function (event) {
    let { mode } = event.currentTarget.dataset
    this.setData({
      mode
    })
  },

  /**
   * 改变账目类型
   */
  onTypeChange: function (event) {
    let { type } = event.currentTarget.dataset
    this.setData({
      type
    })
  }
})