// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.id
})

const db = cloud.database()
const accounts = db.collection('account')

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  let { id, date, list, type = 0 } = event
  let account = accounts
  let method = 'add'
  if (id) {
    account = accounts.doc(id)
    method = 'set'
  }

  return await account[method]({
    data: {
      _openid: OPENID,
      date,
      list,
      type,
      timestamp: db.serverDate()
    }
  }).then(res => {
    return res
  })
}