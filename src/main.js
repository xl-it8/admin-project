import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入基础样式
import '@/styles/reset.less'
// 完整引入组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//处理时间
import dayjs from 'dayjs'
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.filter('dateFormate', function (time) {
  return dayjs(time).format('YYYY-MM-DD')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
