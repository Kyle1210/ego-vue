// 品牌相关接口
import request from '@/api/request'

// 分页获取品牌列表
export const reqGetTrademarkList = (currentPage, limit) => request.get(`/admin/product/baseTrademark/${currentPage}/${limit}`)

// 根据id删除品牌
export const reqDeleteTrademarkById = (id) => request.delete(`/admin/product/baseTrademark/remove/${id}`)

// 根据id修改品牌
export const reqEditTrademarkById = (trademarkInfo) => request.put('/admin/product/baseTrademark/update', trademarkInfo)

// 新增品牌
export const reqAddTrademark = (trademarkInfo) => request.post('/admin/product/baseTrademark/save', trademarkInfo)
