/**
 * Created by Administrator on 2018/3/30.
 */

let common = {
  assign(n, o) {
    if (typeof o == 'object') {
      for (let attr in o) {
        if (o.hasOwnProperty(attr)) {
          if (!n[attr]) {
            if (typeof o[attr] !== 'object') {
              n[attr] = o[attr]
            } else {
              n[attr] = {}
              common.assign(n[attr], o[attr])
            }
          }
        }
      }
    }
    return n
  },
  formDate(fmt, time) {
    //@params
    // fmt: yy-MM-dd hh:mm:ss’,'yyyy-MM-dd','hh:mm:ss'
    // time: new Date(),或者时间戳
    // formDate('yy-MM-dd hh:mm:ss',new Date())
    var date = new Date()
    debugger
    date.setTime(time)
    var obj = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var key in obj) {
      if (new RegExp('(' + key + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : (('00' + obj[key]).substr(('' + obj[key]).length)))
      }
    }
    return fmt
  }
}

export { common }