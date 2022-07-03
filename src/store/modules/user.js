import { reqLogin, reqGetUserInfo } from '../../api/user/userAPI'
import { setToken, getToken, removeToken } from '@/utils/token.js'
import { Message } from 'element-ui'
import { contrasRouter, defaultRoutes, userEmnu } from '@/utils/contrastRouter.js'
import router from '@/router/index.js'
import asyncRoutes from '@/router/asyncRoutes/asyncRoutes'

const actions = {

  // 用户登陆
  async login ({ commit, dispatch }, { username, password }) {
    const { data: res } = await reqLogin(username, password)
    if (res.code === 20000) {
      commit('SET_TOKEN', res.data.token)
      // 本地化储存token
      setToken(res.data.token)
      // 获取用户信息
      dispatch('getUserInfo')
      // 路由跳转
      router.push('/')
    } else {
      this.$message.error('用户名或密码错误..')
    }
  },

  // 获取用户信息
  async getUserInfo ({ commit, state, dispatch }) {
    const { data: res } = await reqGetUserInfo()
    if (res.code === 20000) {
      // 保存信息到token
      dispatch('setToken')
      // 将用户信息保存到vuex
      commit('SET_USERINFO', res.data)
      // 设置默认路由
      commit('SET_DEFAULT_ROUTES', defaultRoutes())
      // 筛选路由
      commit('SET_RESULT_SAYNC_ROUTES', contrasRouter(state.userInfo.routes, asyncRoutes))
      // 设置菜单
      commit('SET_USER_MENU', userEmnu(state.defaultRoutes, state.resultAsyncRoutes))
    } else {
      Message.error(res.data.message || '未知错误')
    }
  },

  // 设置token
  setToken ({ commit }) {
    commit('SET_TOKEN', getToken())
  },

  // 退出登陆
  logout ({ commit }) {
    // 移除本地化的token
    removeToken()
    // 清除vuex里的数据
    commit('SET_DEFAULT_VUEX')
    // // 强制刷新，用于解决切换用户后菜单遗留问题
    // window.location.reload(true)
    // 跳转到登陆页
    router.replace('/login')
  }
}

const mutations = {
  // vuex初始化
  SET_DEFAULT_VUEX (state) {
    state = {
      token: '',
      userInfo: {},
      // 最终路由
      resultAsyncRoutes: [],
      // 默认路由
      defaultRoutes: [],
      // 用户菜单
      userMenu: []
    }
  },

  // 设置菜单
  SET_USER_MENU (state, userMenu) {
    state.userMenu = userMenu
  },

  // 设置默认路由
  SET_DEFAULT_ROUTES (state, defaultRoutes) {
    state.defaultRoutes = defaultRoutes
  },

  // 设置筛选后的路由
  SET_RESULT_SAYNC_ROUTES (state, resultAsyncRoutes) {
    resultAsyncRoutes.forEach(element => {
      router.addRoute('Layout', element)
    })
    state.resultAsyncRoutes = resultAsyncRoutes
  },

  // 设置token
  SET_TOKEN (state, token) {
    state.token = token
  },

  // 设置用户信息
  SET_USERINFO (state, data) {
    state.userInfo = data
  },

  // 删除用户信息
  REMOVE_USER (state) {
    state.userInfo = {}
    state.token = ''
  }
}

const state = {
  token: '',
  userInfo: {},
  // 最终路由
  resultAsyncRoutes: [],
  // 默认路由
  defaultRoutes: [],
  // 用户菜单
  userMenu: []
}

// 筛选出来的异步路由
// const ComputedAsyncRoutes = (asyncRoutes, routes) => {
//   return asyncRoutes.filter(item => {
//     //  indexOf 如果数组中含有这个元素，返回的一定不是-1
//     if (routes.indexOf(item.name) !== -1) {
//       // 判断是否有子元素，有的话利用递归
//       if (item.children) {
//         // 递归
//         ComputedAsyncRoutes(item.children, routes)
//       }
//       return true
//     }
//   })
// }
export default {
  namespaced: true,
  actions,
  mutations,
  state
}
