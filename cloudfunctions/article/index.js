// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request-promise');


cloud.init({
  env: "wyj-cloud"
})

// 获取数据库实例
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  console.log(wxContext)
  const requestArticles = async (access_token, offset, count) => {
    let item = {
      "type": "news",
      "offset": offset,
      "count": count,
      "offset_type": 1
    }

    let data = await request({
        uri: "https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=" + access_token,
        method: "POST",
        json: true,
        headers: {
          "Content-Type": "application/json"
        },
        body: item,
      })
    return data
  }

  const requestAccess_Token = async () => {
    let data = await request({
      url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxcb087ca79d983e85&secret=fa3c10a14b15f63ba3897bab0f5f5bf7",
      method: "GET",
    });
    return data;
  }

  // 获取数据库数据
  let data = await db.collection('wx_articles_expire').doc('1').get()
  // token
  let access_token = data.data.access_token
  // 过期时间
  let expiration = data.data.expiration
  // 当前时间戳
  let timestamp = Date.parse(new Date())
  // token不存在或已过期，请求access_token
  if (!access_token || (expiration < timestamp)) {
    console.log(!access_token, (expiration < timestamp), expiration, timestamp)
    console.log("已过期，重新获取")
    let item = await requestAccess_Token()
    item = JSON.parse(item)
    access_token = item.access_token
    let expires_in = item.expires_in
    // 存入数据库
    db.collection('wx_articles_expire').doc("1").update({
      data: {
        access_token: access_token,
        expiration: timestamp + (expires_in * 1000)
      }
    })
  }
  
  // 微信公众号文章
  let articles = await requestArticles(access_token, event.offset, event.count)
  return {
    articles
  }
}