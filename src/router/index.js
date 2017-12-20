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
            path: '/',
            name: 'Index',
            component: (resolve) => require(['@/pages/Index'], resolve),
            meta: {
                title: '蘑菇信用 - 主页'
            }
        },
        {
            path: '/applyForLoan',
            name: 'ApplyForLoan',
            component: (resolve) => require(['@/pages/ApplyForLoan'], resolve),
            meta: {
                title: '蘑菇信用 - 申请借贷'
            }
        },
        {
            path: '/selectAuth',
            name: 'SelectAuth',
            component: (resolve) => require(['@/pages/SelectAuth'], resolve),
            meta: {
                title: '蘑菇信用 - 选择认证'
            }
        }
    ]
})
