// components/userinfo/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: 0,
    avatarUrl: '',
    nickName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo (e) {
      if (this.data.isLogin === 1 && e.detail.userInfo) {
        let { avatarUrl, nickName } = e.detail.userInfo
        let data = {
          isLogin: 2,
          avatarUrl,
          nickName
        }
        this.setData(data)
        app.globalData.userInfo = data
      }
    },

    onSetUserInfo () {
      this.setData({
        ...app.globalData.userInfo
      })
    }
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached () {
      if (app.globalData.userInfo) {
        this.onSetUserInfo()
      } else {
        app.getUserInfoCallback = () => {
          this.onSetUserInfo()
        }
      }
    }
  },

  options: {
    addGlobalClass: true
  }
})
