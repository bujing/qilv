// components/category/add.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    main: Array,
    show: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    mainValue: -1,
    type: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示/隐藏添加分类弹框
     */
    onShowCategoryModal: function (event) {
      let { show } = event.currentTarget.dataset
      this.setData({
        show
      })
    },

    /**
     * 父类选择
     */
    onMainCategoryChange: function (res) {
      let { main } = this.data
      let { value } = res.detail

      this.setData({
        mainValue: value,
        type: main[value].type ? 1 : 0
      })
    },

    /**
     * 取消选择
     */
    onMainCategoryCancel: function () {
      this.setData({
        mainValue: -1
      })
    },

    /**
     * 分类名称输入
     */
    onCategoryNameInput: function (res) {
      this.setData({
        categoryName: res.detail.value
      })
    },

    /**
     * 分类类型选择
     */
    onRadioChange: function (event) {
      let { value } = event.detail
      this.setData({
        type: +value
      })
    },

    /**
     * 新增分类
     */
    onCategorySave: function () {
      let { categoryName, main, mainValue, type } = this.data
      if (!categoryName) {
        wx.showToast({
          icon: 'none',
          title: '请输入分类名称'
        })
        return false
      }
      wx.showLoading({
        mask: true
      })
      app.setCategorys({
        name: categoryName,
        parent: mainValue === -1 ? '' : main[mainValue]._id,
        type,
        delete: false
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '新增分类成功！'
        })

        this.setData({
          mainValue: -1,
          categoryName: '',
          show: false
        })
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})
