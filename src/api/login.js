// 引入request
import request from '../libs/request';

export function login(data) {
  return request({
    url: '/example/uesr',
    method: 'get',
    data,
  });
}
