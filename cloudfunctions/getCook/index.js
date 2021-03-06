// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.id
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('cook').where({
    _openid: wxContext.OPENID
  }).get().then(res => {
    return res.data.filter(item => !item.delete).reverse()
  })
}