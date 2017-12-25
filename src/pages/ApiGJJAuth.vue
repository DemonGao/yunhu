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
        <div style="display: none">
            <x-input
                ref="reqId"
                name="reqId"
                v-model="reqId"
                placeholder="reqId"
                :required="false"
            ></x-input>
            <x-input
                ref="partnerId"
                name="partnerId"
                v-model="partnerId"
                placeholder="partnerId"
                :required="true"
            ></x-input>
            <x-input
                ref="cityCode"
                name="cityCode"
                v-model="cityCode"
                placeholder="cityCode"
                :required="true"
            ></x-input>
            <x-input
                ref="loginType"
                name="loginType"
                v-model="loginType"
                placeholder="loginType"
                :required="true"
            ></x-input>
        </div>
        <x-address
            title="你当前所在城市"
            :list="cityList"
            placeholder="请选择地址"
            @on-shadow-change="changeCity"
        >
        </x-address>
        <template v-if="loginType == 0">
            <group title="姓名" :title-color="groupColor" class="dm-input">
                <x-input
                    ref="name"
                    name="name"
                    v-model="name"
                    placeholder="请输入您的真实姓名"
                    :required="true"
                    @on-enter="nextFocus('ID')"
                ></x-input>
            </group>
            <group title="身份证号码" :title-color="groupColor" class="dm-input">
                <x-input
                    ref="ID"
                    v-model="ID"
                    name="ID"
                    placeholder="请输入您的身份证号码"
                    :required="true"
                    @on-enter="nextFocus('customer_id')"
                ></x-input>
            </group>
            <group title="公积金账号" :title-color="groupColor" class="dm-input">
                <x-input
                    ref="customer_id"
                    name="customer_id"
                    v-model="customer_id"
                    placeholder="请输入您的真实姓名"
                    :required="true"
                    @on-enter="nextFocus('mobile')"
                ></x-input>
            </group>
            <group title="查询密码" :title-color="groupColor" class="dm-input">
                <x-input
                    ref="password"
                    name="password"
                    v-model="password"
                    placeholder="请输入您的公积金查询密码"
                    :required="true"
                    @on-enter="nextFocus('mobile')"
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

    import {XInput, Group, XButton, Box, XAddress} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import FormMixin from '@/mixins/FormMixin.vue'

    export default {
        mixins: [UtilMixin, FormMixin],
        data() {
            return {
                groupColor: '#50b97b',
                reqId: null,
                partnerId: 'yousu',
                loginType: -1,
                name: null,
                mobile: null,
                certNo: null,
                userName: null,
                smsCode: null,
                addressData: [
                    {
                        'name': '北京市',
                        'value': '110000'
                    },
                    {
                        'name': '市辖区',
                        'value': '110100',
                        'parent': '110000'
                    },
                    {
                        'name': '东城区',
                        'value': '110101',
                        'parent': '110100'
                    },
                    {
                        'name': '西城区',
                        'value': '110102',
                        'parent': '110100'
                    },
                    {
                        'name': '朝阳区',
                        'value': '110105',
                        'parent': '110100'
                    },
                    {
                        'name': '丰台区',
                        'value': '110106',
                        'parent': '110100'
                    }
                ],
                cityList: [],
                cityCode: null
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Box,
            XAddress
        },
        computed: {},
        methods: {
            formMixin_submit(ajaxUrl) {
                this.$vux.loading.show({
                    text: '等待中...'
                })
                // 信息填写不完整
                const ISEMPTY = 0
                const ISNOVALID = 1
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
                    this.$vux.loading.show({
                        text: '等待中...'
                    })
                    this.submitLoadding = true
                    if (this.type !== null) {
                        params = {
                            url: 'https://credit.baiqishi.com/clweb/api/tb/login',
                            data: params
                        }
                    }
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
                if (type === 0) {
                    this.smsCode = ''
                }
                if (type === 1 && !this.smsCode) {
                    this.$vux.toast.show({
                        type: 'cancel',
                        text: '请填写验证码'
                    })
                    return
                }
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
            ajaxCityList() {
                this.$axios._post({
                    url: '/bqs_api/',
                    data: {
                        url: 'https://credit.baiqishi.com/clweb/api/hfund/supportcity',
                        data: {
                            partnerId: this.partnerId
                        }
                    }
                }).then(res => {
                    const cityList = res.cityInfoList
                    let cityData = []
                    cityList.forEach((item) => {
                        if (item.status === '0') {
                            cityData.push({
                                name: item.cityCodeDesc ? item.cityCodeDesc : item.provinceDesc,
                                value: item.cityCode
                            })
                        }
                    })
                    this.cityList = cityData
                })
            },
            changeCity(ids, names) {
                console.log(ids)
                console.log(names)
                this.cityCode = ids[ids.length - 1]
                this.ajaxLoginType()
            },
            ajaxLoginType() {
                this.$axios._post({
                    url: '/bqs_api/',
                    data: {
                        url: 'https://credit.baiqishi.com/clweb/api/hfund/logintype',
                        data: {
                            partnerId: this.partnerId,
                            cityCode: this.cityCode
                        }
                    }
                }).then(res => {
                    console.log(res)
                    this.loginType = res.loginCmdFields[0].loginType
                    console.log(this.loginType)
                })
            }
        },
        created() {
            this.ajaxCityList()
        },
        mounted() {
        }
    }
</script>
