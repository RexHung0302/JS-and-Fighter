import Vue from 'vue'
import App from './app.vue'
import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css' // 載入 bootstrap CSS 檔
import 'bootstrap' // 載入 bootstrap 的 JS 檔

window.$ = window.jQuery = jQuery

//申明一个空div
const root = document.createElement('div');
document.body.appendChild(root);

//把app.vue的内容挂载到空div上
new Vue({
    render: (h) => h(App)
}).$mount(root);