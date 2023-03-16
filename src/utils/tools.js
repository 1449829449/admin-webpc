// 计算两个对象交集
export function Objectbemixed(a, b){
  let c = {}
  for (const key in a) {
    c[key] = b[key] || a[key]
  }
  return  c
}
// 清空对象属性值
export function Objectclear(a){
  for (const key in a) {
    switch (Object.prototype.toString.call(a[key])) {
      case '[object Object]':
        a[key] = {}
        break;
      case '[object Array]':
        a[key] = []
        break
      default:
        a[key] = ''
        break;
    }
   
  }
  return a
}
