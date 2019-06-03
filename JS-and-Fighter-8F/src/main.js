import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jquery from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

new Vue({
    router,
    jquery,
    render: h => h(App)
}).$mount('#app')