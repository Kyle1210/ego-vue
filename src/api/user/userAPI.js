import request from '@/api/request'

// 登陆接口
export const reqLogin = (username, password) => request.post('/admin/acl/index/login', { username, password })

// 获取用户信息
export const reqGetUserInfo = (token) => request.get('/admin/acl/index/info')
