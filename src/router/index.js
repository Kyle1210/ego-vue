import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 常量路由: 登陆后任何用户都能看到
export const constantRoutes = [
  // 登陆
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: { isLoading: false }
  },

  // layout
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/views/Layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Product/Home/Home.vue'),
        meta: { title: '首页', icon: 'iconfont icon-shouye' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

export default router
