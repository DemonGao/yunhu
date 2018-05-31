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
                title: '登录'
            },
            props: true
        },
        {
            path: '/index',
            name: 'Home',
            component: (resolve) => require(['@/pages/Home'], resolve),
            children: [
                {
                    path: 'drcr/:identification',
                    name: 'Index',
                    component: (resolve) => require(['@/pages/Index'], resolve),
                    meta: {
                        title: '主页'
                    },
                    props: true
                },
                {
                    path: 'contactUs/:identification',
                    name: 'ContactUs',
                    component: (resolve) => require(['@/pages/ContactUs'], resolve),
                    meta: {
                        title: '联系客服'
                    },
                    props: true
                },
                {
                    path: 'selectAuth/:identification',
                    name: 'SelectAuth',
                    component: (resolve) => require(['@/pages/SelectAuth'], resolve),
                    meta: {
                        title: '第三方认证'
                    },
                    props: true
                },
                {
                    path: 'applyBaseInfo/:identification',
                    name: 'ApplyBaseInfo',
                    component: (resolve) => require(['@/pages/ApplyBaseInfo'], resolve),
                    meta: {
                        title: '基础信息'
                    },
                    props: true
                },
                {
                    path: 'applySupplementInfo/:identification',
                    name: 'ApplySupplementInfo',
                    component: (resolve) => require(['@/pages/ApplySupplementInfo'], resolve),
                    meta: {
                        title: '补充信息'
                    },
                    props: true
                }
            ]
        },
        {
            path: '/h5AuthPage',
            name: 'H5AuthPage',
            component: (resolve) => require(['@/pages/h5AuthPage'], resolve),
            meta: {
                title: ''
            },
            props: true
        },
        {
            path: '/apiTBAuth',
            name: 'ApiTBAuth',
            component: (resolve) => require(['@/pages/ApiTBAuth'], resolve),
            meta: {
                title: '淘宝认证'
            },
            props: true
        },
        {
            path: '/apiJDAuth',
            name: 'ApiJDAuth',
            component: (resolve) => require(['@/pages/ApiJDAuth'], resolve),
            meta: {
                title: '京东认证'
            },
            props: true
        },
        {
            path: '/apiGJJAuth',
            name: 'ApiGJJAuth',
            component: (resolve) => require(['@/pages/ApiGJJAuth'], resolve),
            meta: {
                title: '公积金认证'
            },
            props: true
        },
        {
            path: '/apiGJJAuthNext',
            name: 'ApiGJJAuthNext',
            component: (resolve) => require(['@/pages/ApiGJJAuthNext'], resolve),
            meta: {
                title: '公积金认证'
            },
            props: true
        },
        {
            path: '/clause',
            name: 'Clause',
            component: (resolve) => require(['@/pages/Clause'], resolve),
            meta: {
                title: '隐私条款'
            },
            props: true
        },
        {
            path: '/protocol',
            name: 'Protocol',
            component: (resolve) => require(['@/pages/Protocol'], resolve),
            meta: {
                title: '优速金融协议'
            },
            props: true
        }
    ]
})
