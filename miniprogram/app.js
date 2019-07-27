//app.js
App({
  globalData: {
    account: null,
    income: null,
    category: null,
    diary: undefined
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'release-4c755a',
        traceUser: true
      })

      this.getAccount()
      this.getCategorys()
    }

    this.getUserInfo()
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = {
                isLogin: 2,
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              }

              if (this.getUserInfoCallback) {
                this.getUserInfoCallback()
              }
            }
          })
        } else {
          this.globalData.userInfo = {
            isLogin: 1
          }
        }
      }
    })
  },

  /**
   * 获取账目明细
   */
  getAccount: function () {
    return wx.cloud.callFunction({
      name: 'getAccount'
    }).then(res => {
      console.log(res)
      this.globalData.account = res.result.account
      this.globalData.income = res.result.income

      if (this.getAccountCallback) {
        this.getAccountCallback()
      }

      return res
    })
  },

  /**
   * 存储账目明细
   */
  setAccount: function (data) {
    return wx.cloud.callFunction({
      name: 'setAccount',
      data
    }).then(res => {
      this.getAccount()

      return res
    })
  },

  /**
   * 获取分类信息
   */
  getCategorys: function () {
    return wx.cloud.callFunction({
      name: 'getCategory'
    }).then(res => {
      console.log(res)
      this.globalData.category = res.result

      if (this.getCategoryCallback) {
        this.getCategoryCallback()
      }

      return res
    })
  },

  /**
   * 存储分类信息
   */
  setCategorys: function (data) {
    return wx.cloud.callFunction({
      name: 'setCategory',
      data
    }).then(res => {
      this.getCategorys()

      return res
    })
  },

  /**
   * 获取记事明细
   */
  getDiary: function () {
    return wx.cloud.callFunction({
      name: 'getDiary'
    }).then(res => {
      console.log(res)
      this.globalData.diary = res.result

      if (this.getDiaryCallback) {
        this.getDiaryCallback()
      }

      return res
    })
  },

  /**
   * 存储记事明细
   */
  setDiary: function (data) {
    return wx.cloud.callFunction({
      name: 'setDiary',
      data
    }).then(res => {
      this.getDiary()

      return res
    })
  }
})
