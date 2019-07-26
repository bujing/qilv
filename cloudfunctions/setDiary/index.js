// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.id
})

const db = cloud.database()
const diarys = db.collection('diary')

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  let { id, template, data, delete: del } = event
  let diary = diarys
  let method = 'add'
  if (id) {
    diary = diarys.doc(id)
    method = 'set'
  }

  return await diary[method]({
    data: {
      _openid: OPENID,
      template,
      data,
      delete: del
    }
  }).then(res => {
    return res
  })
}