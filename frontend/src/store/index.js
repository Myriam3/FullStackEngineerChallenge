import Vue from 'vue'
import Vuex from 'vuex'
import * as employees from '@/store/modules/employees.js'
import * as reviews from '@/store/modules/reviews.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: false,
    user: '5f2fcaaf5bbb5505145a07b6'
  },
  modules: {
    employees,
    reviews
  },
  mutations: {},
  actions: {}

})