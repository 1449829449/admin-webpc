// 引入request
import request from '../libs/request';

export function login(params) {
  return request({
    url: '/api/login',
    method: 'GET',
    params,
  });
}
//修改密码
export function editPassword(params){
  return request({
    url: '/user/password/update',
    method: 'POST',
    params
  })
}
//获取动态路由列表
export function addRoute(params){
  return request({
    url:'/role/tree',
    method:'GET',
    params
  })
}