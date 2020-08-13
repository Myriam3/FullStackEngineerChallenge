import Vue from 'vue'
import Vuex from 'vuex'
import * as employees from '@/store/modules/employees.js'
import * as reviews from '@/store/modules/reviews.js'
import * as feedbacks from '@/store/modules/feedbacks.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: false,
    userId: null,
    user: null
  },
  modules: {
    employees,
    reviews,
    feedbacks
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.userId = id;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.userId = null;
      state.user = null;
    },
    SET_ADMIN(state, value) {
      state.admin = value;
    }
  },
  actions: {
    connectUser({
      dispatch,
      commit
    }, {
      id,
      isAdmin
    }) {
      // Save connected id
      localStorage.setItem('connected', id);
      // Set current user id
      commit('SET_USER_ID', id);
      // Set admin/user mode
      if (isAdmin) commit('SET_ADMIN', true);
      else commit('SET_ADMIN', false);
      // Fetch current user
      dispatch('employees/fetchById', id)
        .then((employee) => {
          commit('SET_USER', employee)
        })
        .catch((error) => {
          console.log(error);
        })
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