import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission/permission'
// 导入element ui
import ElementUI from 'element-ui'
// 导入element ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入echarts
import * as echarts from 'echarts'
// 样式初始化
import 'normalize.css'
// 导入进度条样式
import 'nprogress/nprogress.css'
// 引入阿里图标
import '@/assets/icon/iconfont.css'
// 导入面包屑组件
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
// 导入三级联动组件
import ThreeLevelLinkage from '@/components/ThreeLevelLinkage/ThreeLevelLinkage'

Vue.config.productionTip = false
// 安装element ui
Vue.use(ElementUI)
// 将面包屑组件挂载为全局组件
Vue.component(Breadcrumb.name, Breadcrumb)
// 将三级联动组件挂载为全局组件
Vue.component(ThreeLevelLinkage.name, ThreeLevelLinkage)
// 挂载echarts
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
