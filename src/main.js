// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import {ToastPlugin, LoadingPlugin, ConfirmPlugin} from 'vux'
import App from './App'
import router from './router/index'
import axiosUtil from './axios/index'

Vue.use(VueRouter)


FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

Vue.prototype.$axios = axiosUtil

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title
    next()
})

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box')
