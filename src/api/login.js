// 引入request
import request from '../libs/request';

export function login(params) {
  return request({
    url: '/api/login',
    method: 'GET',
    params,
  });
}