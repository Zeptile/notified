import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    bookResults: []
  },
  mutations: {
    loading(state, value) {
      state.loading = value;
    },
    bookResults(state, value) {
      state.bookResults = value;
    }
  },
  getters: {
    loading: state => state.loading,
    bookResults: state => state.bookResults,
    getBookById: (state) => (id) => {
      return state.bookResults.find(b => b._id === id)
    }
  },
  actions: {
  },
  modules: {
  }
})
