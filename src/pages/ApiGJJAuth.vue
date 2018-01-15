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
                placeholder="登录类型"
                :required="true"
            ></x-input>
        </div>
        <group title="姓名" :title-color="groupColor" class="dm-input">
            <x-input
                ref="name"
                name="name"
                v-model="name"
                placeholder="请输入您的真实姓名"
                :required="true"
            ></x-input>
        </group>
        <group title="手机号码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="mobile"
                name="mobile"
                v-model="mobile"
                placeholder="请输入您的手机号码"
                :required="true"
                type="tel"
            ></x-input>
        </group>
        <group title="身份证号码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="certNo"
                v-model="certNo"
                name="certNo"
                placeholder="请输入您的身份证号码"
                :required="true"
            ></x-input>
        </group>
        <x-address
            title="你当前所在城市"
            :list="cityList"
            placeholder="请选择地址"
            @on-shadow-change="changeCity"
        >
        </x-address>
        <box gap="20px">
            <x-button type="confirm"
                      :gradients="['#50b97b', '#19D5FD']"
                      @click.native="submit()"
            >
                下一步
            </x-button>
        </box>
    </div>
</template>

<script>
    /* eslint-disable indent,camelcase,prefer-promise-reject-errors */

    import {XInput, Group, XButton, Box, XAddress, Picker} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'

    export default {
        mixins: [UtilMixin],
        data() {
            return {
                groupColor: '#50b97b',
                partnerId: 'yousu',
                loginType: null,
                mobile: null,
                name: null,
                certNo: null,
                cityCode: null,
                cityList: []
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
                    let params = {}
                    for (let key in this.$refs) {
                        let ref = this.$refs[key]
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
                            params[ref.name] = ref.currentValue
                        }
                    }
                    resolve(params)
                })
            },
            submit() {
                this.formMixin_submit('/bqs_api/')
                    .then((res) => {
                        this.$router.push({
                            name: 'ApiGJJAuthNext',
                            query: {baseInfo: JSON.stringify(res), checkway: this.$route.query.checkway}
                        })
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
                    this.data = res.cityInfoList
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
                    this.loginType = res.loginCmdFields[0].loginType
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
