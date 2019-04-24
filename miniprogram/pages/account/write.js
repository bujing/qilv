// miniprogram/pages/account/write.js
import utils from '../../utils/index'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    endDate: '',
    account: {
      list: []
    },
    income: {
      list: []
    },
    all: {},
    main: [],
    sub: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let endDate = utils.dateFormat(new Date().getTime(), 'yyyy-MM-dd')
    let date = options.date || endDate
    this.setData({
      date,
      endDate
    })

    this.getAccount()
    this.getCategory()

    app.getAccountCallback = this.getAccount
    app.getCategoryCallback = this.getCategory
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

  /**
   * 获取明细
   */
  getAccount: function () {
    let { account, income } = app.globalData
    if (!account) return false
    let { date } = this.data
    let acc = account.daily.filter(item => item.date === date)[0] || {
      _id: '',
      list: []
    }
    let inc = income.daily.filter(item => item.date === date)[0] || {
      _id: '',
      list: []
    }
    this.setData({
      account: {
        id: acc._id,
        list: acc.list
      },
      income: {
        type: 1,
        id: inc._id,
        list: inc.list
      }
    })
  },

  /**
   * 删除明细
   */
  onDelAccount: function (event) {
    wx.showModal({
      title: '温馨提示',
      content: `你确定要删除该记录吗？`,
      success: res => {
        if (res.confirm) {
          let { mode, index } = event.currentTarget.dataset
          let { account, income } = this.data
          if (mode === 'income') {
            income.list.splice(index, 1)
            this.setData({
              income
            })
          } else {
            account.list.splice(index, 1)
            this.setData({
              account
            })
          }
        }
      }
    })
  },

  /**
   * 保存明细
   */
  onAccountSave: function () {
    let { date, account, income } = this.data
    account.date = date
    income.date = date

    let hasMoneyIsNull = account.list.concat(income.list).some(item => !item.money)
    if (hasMoneyIsNull) {
      wx.showToast({
        icon: 'none',
        title: '请填写完整金额信息！'
      })
      return false
    }

    wx.showLoading({
      mask: true
    })
    let request = []
    if (account.id || account.list.length) request.push(app.setAccount(account))
    if (income.id || income.list.length) request.push(app.setAccount(income))
    Promise.all(request).then(res => {
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '保存账目成功！'
      })

      setTimeout(() => {
        wx.switchTab({
          url: './read'
        })
      }, 500)
    }).catch(err => {
    })
  },

  /**
   * 日期选择
   */
  onDateChange: function (res) {
    this.setData({
      date: res.detail.value
    })
    this.getAccount()
  },

  /**
   * 获取分类信息
   */
  getCategory: function () {
    let { category } = app.globalData
    if (!category) return false
    let { all, main } = category
    main = main.filter(item => !item.delete)
    this.setData({
      all,
      main
    })

    if (main[0]) {
      this.setSub(0)
    } else {
      wx.showToast({
        icon: 'none',
        title: '请先添加分类！'
      })

      setTimeout(() => {
        wx.navigateTo({
          url: './category'
        })
      }, 500)
    }
  },

  /**
   * 设置子分类
   */
  setSub: function (row) {
    let { all, main } = this.data
    let id = main[row]._id
    let sub = []
    for (let key in all) {
      let value = all[key]
      if (id === value.parent && !value.delete) {
        sub.push(value)
      }
    }
    this.setData({
      sub
    })
  },

  /**
   * 更新子分类
   */
  onCategoryColumnChange: function (res) {
    let { column, value } = res.detail
    if (column === 0) {
      this.setSub(value)
    }
  },

  /**
   * 分类选择
   */
  onCategoryChange: function (res) {
    let { value } = res.detail
    let { account, income, main, sub } = this.data
    
    let data = {
      main: main[value[0]]._id
    }
    if (sub.length) {
      let index = value[1] || 0
      data.sub = sub[index]._id
    } else {
      data.sub = ''
    }
    if (main[value[0]].type) {
      income.list.push(data)
    } else {
      account.list.push(data)
    }
    this.setData({
      account,
      income
    })
  },

  /**
   * 更新金额、备注
   */
  onItemInput: function (event) {
    let { mode, type, index } = event.currentTarget.dataset
    let { value } = event.detail
    let { account, income } = this.data
    if (mode === 'income') {
      income.list[index][type] = value
    } else {
      account.list[index][type] = value
    }
    this.setData({
      account,
      income
    })
  }
})