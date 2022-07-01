import request from '@/api/request'

// 获取sku列表数据的接口
export const reqGetSkuList = (currentPage, limit) => request.get(`admin/product/list/${currentPage}/${limit}`)

// 上架
export const reqOnSale = (skuId) => request.get(`/admin/product/onSale/${skuId}`)

// 下架
export const reqCancel = (skuId) => request.get(`/admin/product/cancelSale/${skuId}`)

// 根据id获取sku详情
export const reqGetSkuInfoById = (skuId) => request.get(`/admin/product/getSkuById/${skuId}`)

// 根据id删除sku
export const reqDeleteSkuById = (skuId) => request.delete(`/admin/product/deleteSku/${skuId}`)
