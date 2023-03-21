// 计算两个对象交集
export function Objectbemixed(a, b){
  let c = {}
  for (const key in a) {
    c[key] = b[key] || a[key]
  }
  return  c
}