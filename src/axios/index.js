import axios from 'axios'

axios.defaults.baseURL = 'http://47.94.133.188:8000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 2500

let post = ({url, data = {}, tips = false}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
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
                console.error('请求异常')
                reject(err, '请求异常')
            })
    })
}

export default {
    post
}
