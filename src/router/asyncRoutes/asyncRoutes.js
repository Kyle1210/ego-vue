// 异步路由: 需要筛选的路由
const syncRoutes = [
  // 商品管理
  {
    path: '/product',
    redirect: '/product/trademark',
    name: 'Product',
    component: () => import('@/views/Product/Product.vue'),
    meta: { title: '商品管理', icon: 'iconfont icon-shangpinguanli' },
    children: [
      {
        path: 'trademark',
        name: 'Trademark',
        component: () => import('@/views/Product/Trademark/Trademark.vue'),
        meta: { title: '品牌管理', icon: 'iconfont icon--pinpaiguanli' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/Product/Attr/Attr.vue'),
        meta: { title: '平台属性管理', icon: 'iconfont icon-shuxingguanli' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/Product/Spu/Spu.vue'),
        meta: { title: 'spu', icon: 'iconfont icon-SPUguanli' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/Product/Sku/Sku.vue'),
        meta: { title: 'sku', icon: 'iconfont icon-SKUguanli' }
      }
    ]
  },
  // 权限管理
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/views/Acl/Acl.vue'),
    meta: { title: '权限管理', icon: 'iconfont icon-quanxianguanli' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/Acl/User/User.vue'),
        meta: { title: '用户管理', icon: 'iconfont icon-yonghuguanli' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/Acl/Role/Role.vue'),
        meta: { title: '角色管理', icon: 'iconfont icon-guanliyuan_jiaoseguanli' }
      }
    ]
  }
]

export default syncRoutes
