/**
 * 格式化日期时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封装请求数据接口
 */
const request = (url, params={}, method = 'GET') => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      method: method,
      data: params,
      success: res => {
        let code=res.data.code
        switch(code){
          case 401:
            console.log('未登录')
            break
          default:
            resolve(res.data)
        }
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}

// module.exports = {
//   formatTime: formatTime
// }
export{
  formatTime,
  request
}
