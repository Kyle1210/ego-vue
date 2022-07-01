// 路由权限控制
import router from '@/router/index.js'
import store from '@/store/index.js'
import { getToken } from '@/utils/token.js'

router.beforeEach((to, from, next) => {
  // 通过本地是否存储了token来判断用户是否已经登陆
  if (!getToken()) { // 用户未登录
    // 判断用户访问的是否为登陆页面
    if (to.name === 'Login') {
      // 直接放行
      next()
    } else {
      // 其余页面需要登录，跳转到登陆页面
      router.push('/login')
      next()
    }
  } else { // 用户已登陆
    // 判断vuex里有没有用户信息，没有的话说明用户刷新了把vuex里的数据清空了
    if (store.state.user.token === '' && store.state.user.token.length === 0) { // 页面被刷新了
      // 拉取用户信息
      store.dispatch('user/getUserInfo').then(() => {
        // 确保路由添加完成
        next({ ...to, replace: true })
      })
    } else {
      next()
    }
  }
})
