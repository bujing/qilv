// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.id
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('account').where({
    _openid: wxContext.OPENID
  }).get().then(res => {
    // 按日期降序排列日账单
    let records = res.data.filter(item => item.list.length).sort((a, b) => a.date < b.date ? 1 : -1)
    records = records.map(item => {
      // 日期转换
      item.title = item.date.replace(/([^-]+)\-([^-]+)\-([^-]+)/g, '$1年$2月$3日')
      return item
    })

    let result = {}
    for (let i = 0; i < 2; i++) {
      let daily = records.filter(item => !item.type === !i)
      let monthly = {}
      let yearly = {}
      for (let item of daily) {
        // 年月截取
        let mTitle = item.title.substr(0, 8)
        // 初始化月记录
        if (!monthly[mTitle]) {
          monthly[mTitle] = {
            title: mTitle, // 支出月份
            days: 0, // 支出天数
            records: 0, // 支出笔数
            total: 0, // 支出总额
            main: {} // 支出明细
          }
        }
        let month = monthly[mTitle]
        month.days++
        month.records += item.list.length

        // 年截取
        let yTitle = item.title.substr(0, 5)
        // 初始化年记录
        if (!yearly[yTitle]) {
          yearly[yTitle] = {
            title: yTitle, // 支出年份
            days: 0, // 支出天数
            records: 0, // 支出笔数
            total: 0, // 支出总额
            main: {} // 支出明细
          }
        }
        let year = yearly[yTitle]
        year.days++
        year.records += item.list.length

        let total = 0
        let mMain = month.main
        let yMain = year.main
        for (let record of item.list) {
          let { money, main, sub } = record
          money = +money
          total += money

          // 初始化每月主分类记录
          if (!mMain[main]) {
            mMain[main] = {
              id: main, // 主分类 ID
              total: 0, // 主分类总额
              sub: {} // 子分类明细
            }
          }
          mMain[main].total += money
          // 初始化每月子分类记录
          let mMainSub = mMain[main].sub
          if (!mMainSub[sub]) {
            mMainSub[sub] = {
              id: sub, // 子分类 ID
              total: 0 // 子分类总额
            }
          }
          mMainSub[sub].total += money

          // 初始化每年主分类记录
          if (!yMain[main]) {
            yMain[main] = {
              id: main, // 主分类 ID
              total: 0, // 主分类总额
              sub: {} // 子分类明细
            }
          }
          yMain[main].total += money
          // 初始化每年子分类记录
          let yMainSub = yMain[main].sub
          if (!yMainSub[sub]) {
            yMainSub[sub] = {
              id: sub, // 子分类 ID
              total: 0 // 子分类总额
            }
          }
          yMainSub[sub].total += money
        }
        item.total = total
        month.total += total
        year.total += total
      }

      monthly = Object.values(monthly).sort((a, b) => a.title < b.title ? 1 : -1)
      for (let item of monthly) {
        item.main = Object.values(item.main).sort((a, b) => a.total < b.total ? 1 : -1)
        item.total = +item.total.toFixed(2)

        for (let main of item.main) {
          main.sub = Object.values(main.sub).sort((a, b) => a.total < b.total ? 1 : -1)
          main.total = +main.total.toFixed(2)
          main.percent = (main.total / item.total * 100).toFixed(2) + '%'
        }
      }

      yearly = Object.values(yearly).sort((a, b) => a.title < b.title ? 1 : -1)
      for (let item of yearly) {
        item.main = Object.values(item.main).sort((a, b) => a.total < b.total ? 1 : -1)
        item.total = +item.total.toFixed(2)

        for (let main of item.main) {
          main.sub = Object.values(main.sub).sort((a, b) => a.total < b.total ? 1 : -1)
          main.total = +main.total.toFixed(2)
          main.percent = (main.total / item.total * 100).toFixed(2) + '%'
        }
      }

      result[i ? 'income' : 'account'] = {
        daily,
        monthly,
        yearly
      }
    }

    return result
  })
}