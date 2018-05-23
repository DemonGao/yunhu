import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jsonp from 'jsonp'

Vue.use(Vuex)

axios.defaults.baseURL = ''
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 1500000

// const host = '/yunhu'
const host = 'http://sms.yunhushuju.com/yunhu'


let post = ({url, data = {}, tips = false, isloadding = false}) => {
    return new Promise((resolve, reject) => {
        if (isloadding) {
            Vue.$vux.loading.show({
                text: ''
            })
        }
        axios.post(host + url, data)
            .then(res => {
                isloadding && Vue.$vux.loading.hide()
                if (res.data.code === 'SUCCESS') {
                    resolve(res.data.body)
                } else {
                    if (tips) {
                        this.$vux.toast.show({
                            type: 'cancel',
                            text: '错误码:' + res.data.code + ', 错误信息: ' + res.data.msg
                        })
                    }
                    if (res.data.code === 100000) {
                        window.location.reload()
                    }
                    reject(res.data.code, res.data.msg)
                }
            })
            .catch(err => {
                Vue.$vux.toast.show({
                    type: 'cancel',
                    text: '请求超时'
                })
                isloadding && Vue.$vux.loading.hide()
                reject(err, '请求超时')
            })
    })
}


let _post = ({url, data = {}, tips = false}) => {
    return new Promise((resolve, reject) => {
        axios.post(host + url, data)
            .then(res => {
                console.log(res)
                if (res.data.resultCode === 'CCOM1000') {
                    resolve(res.data.data)
                } else {
                    let err = {
                        code: res.data.resultCode,
                        msg: res.data.resultDesc,
                        data: res.data.data
                    }
                    reject(err)
                }
            })
            .catch(err => {
                console.error('请求异常')
                reject(err, '请求异常')
            })
    })
}

let _jsonp = ({url, data = {}, tips = false}) => {
    let dealUrl = data === {} ? url : url + '?' + urlEncode(data, null)
    return new Promise((resolve, reject) => {
        jsonp(dealUrl, null, function (err, data) {
            if (err) {
                console.error('请求异常')
                reject(err, '请求异常')
            } else {
                console.log(data)
                resolve(data)
            }
        })
    })
}


let urlEncode = (param, key, encode) => {
    if (param === null) {
        return ''
    }

    let paramStr = ''
    let t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param)
    } else {
        for (let i in param) {
            let k = key === null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += urlEncode(param[i], k, encode)
        }
    }
    return paramStr
}
export default {
    post,
    jsonp: _jsonp,
    _post
}
