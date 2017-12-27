<style lang="less" rel="stylesheet/less" scoped="scoped">
    .ApplyForLoan {
        @defaultFontColor: #969696;
        @color: #50b97b;
        .dm-input {
            box-sizing: border-box;
            .sendCode {
                padding: 10px;
                color: #969696;
                background-color: #D9D9D9;
                -webkit-border-radius: 0 5px 5px 0;
                -moz-border-radius: 0 5px 5px 0;
                border-radius: 0 5px 5px 0;
            }
        }
        /*图片上传*/
        .uploadImg {
            width: 100%;
            font-size: 0;
            -webkit-text-size-adjust: none;
            vertical-align: middle;
            .item {
                display: inline-block;
                width: 25vw;
                height: 25vw;
                box-sizing: border-box;
                padding: 10px;
                color: @defaultFontColor;
                position: relative;
                .content {
                    &.add {
                        background-color: #ccc;
                    }
                    position: absolute;
                    left: 5px;
                    right: 5px;
                    top: 5px;
                    bottom: 5px;
                    font-size: 12px;

                    text-align: center;
                    display: flex;
                    flex-flow: nowrap column;
                    justify-content: space-around;
                    span {
                        font-size: 12px;
                    }
                    i.iconfont {
                        font-size: 25px;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="demonUI ApplyForLoan">
        <template v-for="(item, index) in formList">
            <group
                :title="item.name"
                :title-color="groupColor"
                class="dm-input extraData">
                <x-input
                    :ref="item.code"
                    :name="item.code"
                    :placeholder="item.des ? item.des :'请填写' + item.name"
                    :required="true"
                ></x-input>
            </group>

        </template>
        <box gap="20px">
            <x-button type="confirm" :disabled="submitLoadding"
                      :gradients="['#50b97b', '#19D5FD']" @click.native="submit(1)"> 提交
            </x-button>
        </box>
    </div>
</template>

<script>
    /* eslint-disable indent,camelcase,prefer-promise-reject-errors */

    import {XInput, Group, XButton, Box, XAddress, Picker} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import FormMixin from '@/mixins/FormMixin.vue'

    export default {
        mixins: [UtilMixin, FormMixin],
        data() {
            return {
                formList: [],
                groupColor: '#50b97b',
                reqId: null,
                partnerId: 'yousu',
                smsCode: null,
                cityList: [],
                cityCode: null,
                data: null,
                baseInfo: JSON.parse(this.$route.query.baseInfo)
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Box,
            XAddress,
            Picker
        },
        computed: {
            picker() {
                const data = this.data || []
                let filterData = []
                data.map(item => {
                    if (item.status === '0') {
                        filterData.push(item)
                    }
                })
                return filterData
            }
        },
        methods: {
            formMixin_submit(ajaxUrl) {
                // 信息填写不完整
                const ISEMPTY = 0
                const ISNOVALID = 1
                return new Promise((resolve, reject) => {
                    let params = Object.assign(this.baseInfo)
                    let extraData = {}
                    for (let key in this.$refs) {
                        let ref = null
                        if (Array.isArray(this.$refs[key])) {
                            if (this.$refs[key].length !== 0) {
                                ref = this.$refs[key][0]
                            } else {
                                break
                            }
                        } else {
                            ref = this.$refs[key]
                        }
                        if (ref.required && !ref.currentValue) {
                            this.$vux.toast.text('请将信息填写完整', 'top')
                            ref.focus()
                            reject({
                                code: ISEMPTY,
                                msg: '信息填写不完整'
                            })
                            return
                        } else {
                            if (!ref.valid) {
                                this.$vux.toast.text(ref.firstError, 'top')
                                ref.focus()
                                reject({
                                    code: ISNOVALID,
                                    msg: '信息填写不完整'
                                })
                                return
                            }
                        }
                        if (ref.name) {
                            extraData[ref.name] = ref.currentValue
                        }
                        params['extraData'] = extraData
                        params['reqId'] = this.reqId
                        params['partnerId'] = this.partnerId
                    }
                    this.$vux.loading.show({
                        text: '等待中...'
                    })
                    this.submitLoadding = true
                    params = {
                        url: 'https://credit.baiqishi.com/clweb/api/hfund/login',
                        data: params
                    }
                    console.log(params)
                    this.$axios._post({
                        url: ajaxUrl,
                        data: params,
                        tips: true
                    }).then(result => {
                        this.$vux.loading.hide()
                        this.submitLoadding = false
                        this.$vux.toast.show({
                            text: '认证成功'
                        })
                        resolve(result)
                    }).catch(err => {
                        this.submitLoadding = false
                        this.$vux.loading.hide()
                        if (err.code === 'CCOM3069') {
                            this.reqId = err.data.reqId
                            this.$vux.toast.show({
                                text: '验证码已发送'
                            })
                            resolve(err.data.reqId)
                        } else {
                            this.$vux.toast.show({
                                type: 'cancel',
                                text: err.msg
                            })
                            reject({
                                code: err.code,
                                msg: err.msg
                            })
                        }
                    })
                })
            },
            submit(type) {
                this.formMixin_submit('/bqs_api/')
                    .then((res) => {
                        console.log(res)
                        if (type === 1) {
                            this.$router.push({name: 'SelectAuth', query: {checkway: this.$route.query.checkway}})
                        }
                    })
                    .catch((err) => {
                        console.log(`code:${err.code} \n msg:${err.msg}`)
                    })
            },
            ajaxLoginType() {
                this.$axios._post({
                    url: '/bqs_api/',
                    data: {
                        url: 'https://credit.baiqishi.com/clweb/api/hfund/logintype',
                        data: {
                            partnerId: this.partnerId,
                            cityCode: this.baseInfo.cityCode
                        }
                    }
                }).then(res => {
                    this.formList = res.loginCmdFields[0].loginFields
                })
            }
        },
        created() {
            console.log(this.baseInfo)
            this.ajaxLoginType()
        },
        mounted() {
        }
    }
</script>
