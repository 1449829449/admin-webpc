// 引入request
import request from '../libs/request';

// 系统用户
export function stemUser(params){
  return request({
    url: '/user/page',
    method:'GET',
    params
  })
}
//角色列表
export function roleList(){
  return request({
    url:'/role/list',
    method:'GET',
  })
}
//修改用户
export function uploadUser(params){
  return request({
    url:'/user/update',
    method:'POST',
    params
  })
}
//新增用户
export function addUser(params){
  return request({
    url:'/user/add',
    method:'POST',
    params
  })
}