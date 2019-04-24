// miniprogram/pages/account/category.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: [],
    main: [],
    categoryModalIsShow: false,
    foldCategorys: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (app.globalData.category) {
      this.getCategory()
    }
    
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
   * 获取分类信息
   */
  getCategory: function () {
    let { main, sub } = app.globalData.category
    let all = main.filter(item => !item.delete)
    for (let item of all) {
      item.sub = sub.filter(itm => itm.parent === item._id && !itm.delete)
    }
    this.setData({
      all,
      main
    })
  },

  /**
   * 分类折叠
   */
  onFoldCategory: function (event) {
    let { id } = event.currentTarget.dataset
    let { foldCategorys } = this.data
    foldCategorys[id] = !foldCategorys[id]
    this.setData({
      foldCategorys
    })
  },

  /**
   * 删除分类
   */
  onCategoryDel: function (event) {
    let { allCategorys } = app.globalData
    let { id, name } = event.currentTarget.dataset

    wx.showModal({
      title: '温馨提示',
      content: `你确定要删除 ${name} 吗？`,
      success: res => {
        if (res.confirm) {
          let { parent } = allCategorys[id]
          app.setCategorys({
            id,
            name,
            parent,
            delete: true
          }).then(res => {
            wx.showToast({
              icon: 'none',
              title: '删除分类成功！'
            })
          })
        }
      }
    })
  },

  /**
   * 显示/隐藏添加分类弹框
   */
  onShowCategoryModal: function (event) {
    let { show } = event.currentTarget.dataset
    this.setData({
      categoryModalIsShow: show
    })
  }
})