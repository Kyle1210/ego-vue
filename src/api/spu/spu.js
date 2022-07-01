import request from '@/api/request.js'

// 获取spu列表数据的接口
export const reqGetSpuList = (currentPage, limit, category3Id) => request.get(`/admin/product/${currentPage}/${limit}`, { params: { category3Id } })

// 获取所有品牌信息
export const reqGetTrademarkList = () => request.get('/admin/product/baseTrademark/getTrademarkList')

// 获取平台的销售属性
export const reqGetSpuSale = () => request.get('/admin/product/baseSaleAttrList')

// 根据id获取spu信息
export const reqGetSpuInfoById = (id) => request.get(`/admin/product/getSpuById/${id}`)

// 根据id获取spu图片
export const reqGetSpuImageListById = (id) => request.get(`/admin/product/spuImageList/${id}`)

// 修改spu
export const reqUpdateSpu = (spuInfo) => request.post('/admin/product/updateSpuInfo', spuInfo)

// 添加spu
export const reqSaveSpu = (spuInfo) => request.post('/admin/product/saveSpuInfo', spuInfo)

// 根据id删除spu
export const reqDeleteSpuById = (id) => request.delete(`/admin/product/deleteSpu/${id}`)
