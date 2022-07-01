import { getToken, removeToken } from '@/utils/token.js'
import router from '@/router/index.js'
import store from '@/store/index.js'
// 导入axios
import axios from 'axios'
// 导入进度条
import Nprogress from 'nprogress'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截
request.interceptors.request.use((config) => {
  Nprogress.start()
  if (router.name !== 'Login') {
    config.headers.token = getToken()
  }
  return config
})

// 响应拦截
request.interceptors.response.use((response) => {
  Nprogress.done()
  if (response.data.code === 20001) { // token过期
    // 移除浏览器的token
    removeToken()
    // vuex 初始化
    store.dispatch('user/logout')
    Message.error(response.data.message)
  }
  return response
}, (error) => {
  console.log(error)
  if (error.response) {
    if (error.response.status === 503) {
      Message.error('服务不可用，服务器暂时过载或维护.')
    }
  }
})

export default request
