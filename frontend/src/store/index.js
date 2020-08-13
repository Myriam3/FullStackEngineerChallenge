import Vue from 'vue'
import Vuex from 'vuex'
import * as employees from '@/store/modules/employees.js'
import * as reviews from '@/store/modules/reviews.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: true,
    user: '5f3502507de5653fec74a4c1' //Admin 1 '5f33569ef693110590d24f4c' //User Jane Doe '5f2fcaaf5bbb5505145a07b6'
  },
  modules: {
    employees,
    reviews
  },
  mutations: {},
  actions: {}

})