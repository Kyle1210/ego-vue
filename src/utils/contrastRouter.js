/**
 * 处理相关路由的方法
 */
import router from '@/router/index.js'

/**
 *
 * @param {Array} userRoute 后台返回的路由权限
 * @param {Array} asyncRoute 前端配置好的路由权限
 * @returns {Array} 符合条件的路由
 */
export function contrasRouter (userRoute, asyncRoute) {
  const realRoutes = []
  asyncRoute.forEach(item => {
    // 如果userRoutes里含有item.name，那么返回的一定不是-1
    if (userRoute.indexOf(item.name) !== -1) {
      if (item.children) {
        item.children = contrasRouter(userRoute, item.children)
      }
      realRoutes.push(item)
    }
  })
  return realRoutes
}

// 默认路由
export function defaultRoutes () {
  return router.options.routes.filter(item => item.name === 'Layout')
}

// 用户对应菜单
export function userEmnu (defaultRoutes, resultAsyncRoutes) {
  resultAsyncRoutes.forEach(item => {
    defaultRoutes[0].children.push(item)
  })
  return defaultRoutes
}
