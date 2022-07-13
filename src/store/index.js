import Vue from 'vue'
import Vuex from 'vuex'
//vuex数据的持有化
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    saveUser(state, payLoad) {
      state.user = payLoad
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
