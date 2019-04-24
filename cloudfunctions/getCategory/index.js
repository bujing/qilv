// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.id
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('category').where({
    _openid: wxContext.OPENID
  }).get().then(res => {
    let all = {}
    let main = []
    let sub = []
    for (let item of res.data) {
      all[item._id] = {
        ...item
      }

      if (!item.parent) {
        main.push(item)
      } else {
        sub.push(item)
      }
    }
    return {
      all,
      main,
      sub
    }
  })
}