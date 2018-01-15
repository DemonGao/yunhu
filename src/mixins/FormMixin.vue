<style scoped rel="stylesheet/less">

</style>
<script>
    /* eslint-disable prefer-promise-reject-errors */

    export default {
        data() {
            return {
                submitLoadding: false
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            formMixin_submit(ajaxUrl) {
                // 信息填写不完整
                const ISEMPTY = 0
                const ISNOVALID = 1
                // ajax请求异常(超时/ajaxUrl不存在)
                const AJAXERROR = 2
                return new Promise((resolve, reject) => {
                    let params = {}
                    for (let key in this.$refs) {
                        if (this.$refs[key].required && this.$refs[key].currentValue === '') {
                            this.$vux.toast.text('请将信息填写完整', 'top')
                            this.$refs[key].focus()
                            reject({
                                code: ISEMPTY,
                                msg: '信息填写不完整'
                            })
                            return
                        } else {
                            if (!this.$refs[key].valid) {
                                this.$vux.toast.text(this.$refs[key].firstError, 'top')
                                this.$refs[key].focus()
                                reject({
                                    code: ISNOVALID,
                                    msg: '信息填写不完整'
                                })
                                return
                            }
                        }
                        if (this.$refs[key].name) {
                            params[this.$refs[key].name] = this.$refs[key].currentValue
                        }
                    }
                    this.identification && (params['identification'] = this.identification)

                    this.submitLoadding = true
                    if (this.type !== null) {
                        if (this.type === 0) {
                            params = {
                                customer_id: parseInt(localStorage.getItem('yunhu!customer_id')),
                                base_info: params
                            }
                        } else if (this.type === 1) {
                            params = {
                                customer_id: parseInt(localStorage.getItem('yunhu!customer_id')),
                                supplement_info: params
                            }
                        }
                    }
                    this.$axios.post({
                        url: ajaxUrl,
                        data: params
                    }).then(result => {
                        this.submitLoadding = false
//                        this.$vux.toast.show({
//                            text: '填写成功'
//                        })
                        resolve(result)
                    }).catch(err => {
                        console.log(err)
                        this.submitLoadding = false
                        this.$vux.loading.hide()
                        this.$vux.toast.show({
                            type: 'cancel',
                            text: '请求超时'
                        })
                        reject({
                            code: AJAXERROR,
                            msg: '请求超时'
                        })
                    })
                })
            },
            // 调到下一个input
            nextFocus(ref) {
                this.$refs[ref].focus()
            }
        }
    }
</script>
