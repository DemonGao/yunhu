import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        // 登录页面
        {
            path: '/login/:identification',
            name: 'Login',
            component: (resolve) => require(['@/pages/Login'], resolve),
            meta: {
                title: '蘑菇信用 - 登录'
            },
            props: true
        },
        // 主页
        {
            path: '/index/:identification',
            name: 'Index',
            component: (resolve) => require(['@/pages/Index'], resolve),
            meta: {
                title: '蘑菇信用 - 主页'
            },
            props: true
        },
        {
            path: '/applyBaseInfo',
            name: 'ApplyBaseInfo',
            component: (resolve) => require(['@/pages/ApplyBaseInfo'], resolve),
            meta: {
                title: '蘑菇信用 - 基础信息'
            }
        },
        {
            path: '/applySupplementInfo',
            name: 'ApplySupplementInfo',
            component: (resolve) => require(['@/pages/ApplySupplementInfo'], resolve),
            meta: {
                title: '蘑菇信用 - 补充信息'
            }
        },
        {
            path: '/selectAuth',
            name: 'SelectAuth',
            component: (resolve) => require(['@/pages/SelectAuth'], resolve),
            meta: {
                title: '蘑菇信用 - 第三方认证'
            },
            props: true
        },
        {
            path: '/h5AuthPage',
            name: 'H5AuthPage',
            component: (resolve) => require(['@/pages/h5AuthPage'], resolve),
            meta: {
                title: '蘑菇信用 - **认证'
            },
            props: true
        },
        {
            path: '/apiTBAuth',
            name: 'ApiTBAuth',
            component: (resolve) => require(['@/pages/ApiTBAuth'], resolve),
            meta: {
                title: '蘑菇信用 - 淘宝认证'
            },
            props: true
        },
        {
            path: '/apiJDAuth',
            name: 'ApiJDAuth',
            component: (resolve) => require(['@/pages/ApiJDAuth'], resolve),
            meta: {
                title: '蘑菇信用 - 京东认证'
            },
            props: true
        },
        {
            path: '/apiGJJAuth',
            name: 'ApiGJJAuth',
            component: (resolve) => require(['@/pages/ApiGJJAuth'], resolve),
            meta: {
                title: '蘑菇信用 - 公积金认证'
            },
            props: true
        },
        {
            path: '/apiGJJAuthNext',
            name: 'ApiGJJAuthNext',
            component: (resolve) => require(['@/pages/ApiGJJAuthNext'], resolve),
            meta: {
                title: '蘑菇信用 - 公积金认证'
            },
            props: true
        }
    ]
})
