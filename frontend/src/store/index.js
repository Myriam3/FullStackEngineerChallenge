import Vue from 'vue'
import Vuex from 'vuex'
import * as employees from '@/store/modules/employees.js'
import * as reviews from '@/store/modules/reviews.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: false,
    user: null
    //Admin2'5f3502507de5653fec74a4c1' 
    //Admin 1 '5f33569ef693110590d24f4c' 
    //User Jane Doe '5f2fcaaf5bbb5505145a07b6'
  },
  modules: {
    employees,
    reviews
  },
  mutations: {
    SET_USER(state, id) {
      console.log('set user', id)
      state.user = id;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_ADMIN(state, value) {
      state.admin = value;
    }
  },
  actions: {
    connectUser({
      commit
    }, {
      id,
      isAdmin
    }) {
      localStorage.setItem('connected', 'connected');
      commit('SET_USER', id);
      if (isAdmin) commit('SET_ADMIN', true);
      else commit('SET_ADMIN', false);
    },
    logOut({
      commit
    }) {
      localStorage.removeItem('connected');
      commit('CLEAR_USER');
      commit('SET_ADMIN', false);
    }
  }

})