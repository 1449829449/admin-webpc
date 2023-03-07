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