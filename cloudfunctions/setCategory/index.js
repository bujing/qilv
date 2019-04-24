// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.id
})

const db = cloud.database()
const categorys = db.collection('category')

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  let { id, name, parent, type, delete: del } = event
  let category = categorys
  let method = 'add'
  if (id) {
    category = categorys.doc(id)
    method = 'set'
  }

  return await category[method]({
    data: {
      _openid: OPENID,
      name,
      parent,
      type,
      delete: del
    }
  }).then(res => {
    return res
  })
}