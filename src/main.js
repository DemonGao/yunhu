// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import {sync} from 'vuex-router-sync'

import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import {ToastPlugin, LoadingPlugin, ConfirmPlugin} from 'vux'
import App from './App'
import router from './router/index'
import axiosUtil from './axios/index'

import 'babel-polyfill'

let store = new Vuex.Store({
    modules: {}
})
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(store)
sync(store, router)
store.registerModule('vux', {
    state: {
        isLoading: false,
        direction: 'forward',
        userInfo: null,
        myVisitingRecordTabIndex: 0
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        },
        updateUserInfo(state, payload) {
            state.userInfo = payload.userInfo
        },
        updateMyVisitingRecordTabIndex(state, payload) {
            state.userInfo = payload.myVisitingRecordTabIndex
        }
    },
    actions: {
        updateUserInfo({commit}, userInfo) {
            commit({type: 'updateUserInfo', userInfo: userInfo})
        },
        updateMyVisitingRecordTabIndex({commit}, myVisitingRecordTabIndex) {
            alert(myVisitingRecordTabIndex)
            commit({type: 'updateMyVisitingRecordTabIndex', myVisitingRecordTabIndex: myVisitingRecordTabIndex})
        }
    }
})

require('es6-promise').polyfill()
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

Vue.prototype.$axios = axiosUtil
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        console.log(el)
        // 聚焦元素
        el.focus()
    }
})

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach((to, from, next) => {
    let COMPANY_NAME = ''
    let pageMsg = localStorage.getItem('yunhu!pageMsg')
    if (pageMsg) {
        pageMsg = JSON.parse(pageMsg)
        COMPANY_NAME = pageMsg.name
    } else {
        axiosUtil.post({
            url: `/customermodel/get_company/`,
            data: {
                identification: to.params.identification
            },
            isloadding: true
        }).then(res => {
            pageMsg = res
            localStorage.setItem('yunhu!pageMsg', JSON.stringify(res))
        })
    }
    to.meta.pageMsg = pageMsg
    if (to.name === 'H5AuthPage') {
        window.document.title = COMPANY_NAME + ' - ' + to.query.title + '认证'
    } else {
        window.document.title = COMPANY_NAME + ' - ' + to.meta.title
    }
    store.commit('updateLoadingStatus', {isLoading: true})
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', {direction: 'forward'})
        } else {
            store.commit('updateDirection', {direction: 'reverse'})
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('updateDirection', {direction: 'forward'})
    }
    next()
})
router.afterEach(function (to) {
    store.commit('updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')
