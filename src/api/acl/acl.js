import request from '@/api/request'
import qs from 'qs'

// 获取用户信息
export const reqGetUser = (currentPage, limit) => request.get(`/admin/acl/user/${currentPage}/${limit}`)

// 获取角色列表
export const reqGetRoles = (currentPage, limit) => request.get(`/admin/acl/role/${currentPage}/${limit}`)

// 根据用户id获取对应角色
export const reqGetRoleByUserId = (userId) => request.get(`/admin/acl/user/toAssign/${userId}`)

// 根据用户id分配角色
export const reqAssignRole = (userInfo) => request.post('/admin/acl/user/doAssign', qs.stringify({
  userId: userInfo.userId,
  roleId: userInfo.roleId
}, { arrayFormat: 'repeat' }))

// 添加用户
export const reqSaveUser = (user) => request.post('/admin/acl/user/save', user)

// 删除用户
export const reqDeleteUser = (userId) => request.delete(`/admin/acl/user/remove/${userId}`)

// 修改用户
export const reqUpdateUser = (userInfo) => request.put('/admin/acl/user/update', userInfo)

// 根据id删除角色
export const reqDeleteRoleById = (roleId) => request.delete(`/admin/acl/role/remove/${roleId}`)

// 添加角色
export const reqAddRole = (role) => request.post('/admin/acl/role/save', role)

// 批量删除角色
export const reqBatchDeleteRoleById = (ids) => request.delete('/admin/acl/role/batchRemove', {
  idList: JSON.stringify(ids)
})

// 修改角色
export const reqUpdateRole = (role) => request.put('/admin/acl/role/update', role)

// 获取所有的权限列表
export const reqGetPermission = () => request.get('/admin/acl/permission')

// 根据角色获取对应的权限
export const reqGetRolePermission = (roleId) => request.get(`/admin/acl/permission/toAssign/${roleId}`)

// 添加或修改角色权限
export const reqAddOrEditPermission = (roleId, permissionIds) => request.post('/admin/acl/permission/doAssign', qs.stringify({
  roleId: roleId,
  permissionId: permissionIds
}, { arrayFormat: 'repeat' }))
