// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.id
})

const db = cloud.database()
const cooks = db.collection('cook')

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  let { id, type, data, delete: del } = event
  let cook = cooks
  let method = 'add'
  if (id) {
    cook = cooks.doc(id)
    method = 'set'
  }

  return await cook[method]({
    data: {
      _openid: OPENID,
      type,
      data,
      delete: del,
      timestamp: db.serverDate()
    }
  }).then(res => {
    return res
  })
}