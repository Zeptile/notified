import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueToastr from 'vue-toastr';
import VueResource from 'vue-resource';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'


Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueToastr);
Vue.use(PerfectScrollbar, {
  wheelSpeed: 0.5,
  swipeEasing: true, 
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
