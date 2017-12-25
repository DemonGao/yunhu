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
        </div>

        <group title="姓名" :title-color="groupColor" class="dm-input">
            <x-input
                ref="name"
                name="name"
                v-model="name"
                placeholder="请输入您的真实姓名"
                :required="true"
                @on-enter="nextFocus('mobile')"
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
                @on-enter="nextFocus('certNo')"
            ></x-input>
        </group>
        <group title="身份证号码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="certNo"
                v-model="certNo"
                name="certNo"
                placeholder="请输入您的身份证号码"
                :required="true"
                @on-enter="nextFocus('userName')"
            ></x-input>
        </group>

        <group title="京东账户名" :title-color="groupColor" class="dm-input">
            <x-input
                ref="userName"
                v-model="userName"
                name="userName"
                placeholder="请输入您的淘宝账户名"
                :required="true"
                @on-enter="nextFocus('pwd')"
            ></x-input>
        </group>

        <group title="密码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="pwd"
                v-model="pwd"
                name="pwd"
                placeholder="请输入您的京东密码"
                :required="false"
                @on-enter="nextFocus('smsCode')"
            ></x-input>
        </group>

        <group title="短信验证码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="smsCode"
                v-model="smsCode"
                name="smsCode"
                placeholder="请输入短信验证码"
                :required="false"
            ></x-input>
            <span class="sendCode" @click="submit(0)">发送验证码</span>
        </group>

        <box gap="20px">
            <x-button type="confirm" :disabled="submitLoadding"
                      :gradients="['#50b97b', '#19D5FD']" @click.native="submit(1)"> 提交
            </x-button>
        </box>
    </div>
</template>

<script>
    /* eslint-disable indent,camelcase,prefer-promise-reject-errors */

    import {XInput, Group, XButton, Box} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import FormMixin from '@/mixins/FormMixin.vue'

    export default {
        mixins: [UtilMixin, FormMixin],
        data() {
            return {
                groupColor: '#50b97b',
                reqId: null,
                partnerId: 'yousu',
                name: '李志修',
                mobile: 15563886389,
                certNo: '370285199308050418',
                userName: '18363857597',
                pwd: 'qwas12',
                smsCode: null
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Box
        },
        computed: {},
        methods: {
            formMixin_submit(ajaxUrl) {
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
                            url: 'https://credit.baiqishi.com/clweb/api/jd/login',
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
            }
        },
        created() {

        },
        mounted() {
        }
    }
</script>
