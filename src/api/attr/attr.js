import request from '@/api/request'

// 获取一级分类数据接口
export const reqGetCategory1 = () => request.get('/admin/product/getCategory1')

// 获取二级分类数据接口
export const reqGetCategory2 = (category1Id) => request.get(`/admin/product/getCategory2/${category1Id}`)

// 获取三级分类数据接口
export const reqGetcategory3 = (category2Id) => request.get(`/admin/product/getCategory3/${category2Id}`)

// 获取平台属性接口
export const reqGetAttrList = (category1Id, category2Id, category3Id) => request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)

// 删除属性
export const reqDeleteAttr = (attrId) => request.delete(`/admin/product/deleteAttr/${attrId}`)

// 添加属性与属性值
export const reqSaveAttrInfo = (addAttrInfo) => request.post('/admin/product/saveAttrInfo', addAttrInfo)
