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
//角色管理列表
export function userList(params){
  return request({
    url: '/role/page',
    method:'GET',
    params
  })
}
//获取菜单列表
export function userTree(params){
  return request({
    url: '/role/allMenuTree',
    method:'GET',
    params
  })
}
//添加角色
export function addRole(params){
  return request({
    url:'/role/add',
    method: 'POST',
    params
  })
}
//修改角色
export function uploadRole(params){
  return request({
    url:'/role/update',
    method: 'POST',
    params
  })
}