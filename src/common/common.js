/**
 * Created by Administrator on 2018/3/30.
 */

let common = {
  assign (n, o){
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
  }
}

export {common}