<style lang="less" rel="stylesheet/less" scoped="scoped">
    .demonUI {
        position: relative;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        .Login {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            box-sizing: border-box;
            padding: 20px;
            width: 100%;

            .dm-input {
                .loginInput {
                    color: #fff;
                }
                .sendCode {
                    padding: 10px;
                    color: #969696;
                    background-color: #ffffff;
                    -webkit-border-radius: 0 5px 5px 0;
                    -moz-border-radius: 0 5px 5px 0;
                    border-radius: 0 5px 5px 0;
                }
            }
            .termagreement {
                margin-top: 10px;
                color: #ffffff;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
            }
        }
    }

</style>
<template>
    <div class="demonUI" :style="{backgroundImage: 'url(\''+bg+'\')'}">
        <div class="Login">
            <group class="dm-input dm-input-placeholder-white">
                <x-input
                    ref="tel"
                    name="tel"
                    class="loginInput"
                    v-model="tel"
                    placeholder="请输入手机号"
                    :required="true"
                    @on-enter="nextFocus('code')"
                ></x-input>
            </group>
            <group class="dm-input dm-input-placeholder-white">
                <x-input
                    ref="code"
                    name="code"
                    class="loginInput"
                    v-model="code"
                    placeholder="请填写验证码"
                    :required="true"
                ></x-input>
                <span class="sendCode" @click="sendCode">
                    发送验证码
                    <template v-if="codeTime!==0">
                        (<countdown
                        v-model="codeTime"
                        @on-finish="codeTime=0"
                        v-show="codeTime!==0"
                    ></countdown>)
                    </template>

                </span>
            </group>
            <div class="termagreement">
                <div>
                    <check-icon :value.sync="clause" type="plain"></check-icon>
                    <router-link :to="{name: 'Clause'}" tag="span" style="color: #f2f2f2;font-weight: 300;">隐私条款</router-link>
                </div>
                <check-icon :value.sync="protocol" type="plain"></check-icon>
                <router-link :to="{name: 'Protocol'}" tag="span" style="color: #f2f2f2;font-weight: 300;">优速金融协议</router-link>
            </div>
            <box gap="30px 0 0">
                <x-button type="confirm" :disabled="submitLoadding" :show-loading="submitLoadding"
                          :gradients="['#1D62F0', '#19D5FD']" @click.native="submit"> 登录
                </x-button>
            </box>
        </div>
    </div>

</template>

<script>
    import {XInput, Group, XButton, Box, Countdown, CheckIcon} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import FormMixin from '@/mixins/FormMixin.vue'

    export default {
        mixins: [UtilMixin, FormMixin],
        props: ['identification'],
        data() {
            return {
                bg: null,
                // 用户名
                tel: '',
                // 密码
                code: '',
                // 发送验证码等待时间
                codeTime: 0,
                clause: false,
                protocol: false,
                loading: true
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Box,
            Countdown,
            CheckIcon
        },
        computed: {},
        methods: {
            sendCode() {
                if (this.codeTime !== 0) {
                    this.$vux.toast.text(`还有${this.codeTime}秒才能再次发送验证码!`)
                    return
                }
                if (this.trim(this.tel) === '') {
                    this.$vux.toast.text('手机号码不能为空')
                    return
                }
                this.$axios.post({
                    url: '/telcheckmodel/',
                    data: {
                        tel: this.tel
                    },
                    isloadding: true
                }).then(res => {
                    this.$vux.toast.show({
                        text: '短信已发送',
                        time: 500
                    })
                    this.codeTime = 60
                })
            },
            // 调到下一个input
            nextFocus(ref) {
                this.$refs[ref].focus()
            },
            submit() {
                if (!this.clause) {
                    this.$vux.toast.text('您未同意隐私条款', 'center')
                    return
                }
                if (!this.protocol) {
                    this.$vux.toast.text('您未同意优速金融协议', 'center')
                    return
                }
                this.formMixin_submit('/customermodel/login/')
                    .then((result) => {
                        localStorage.setItem('yunhu!customer_id', result.customer_id)
                        const _this = this
                        this.$vux.toast.show({
                            text: '登陆成功',
                            time: 500,
                            onHide() {
                                _this.routerLink('Index', {identification: _this.identification}, {checkway: _this.$route.query.checkway})
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(`code:${err.code} \n msg:${err.msg}`)
                    })
            }
        },
        created(){
            this.$axios.post({
                url: `/customermodel/get_company/`,
                data: {
                    identification: this.identification
                },
                isloadding: true
            }).then(res => {
                console.log(res)
                this.bg = res.img1
                this.loading = true
            })
        },
        mounted() {
        }
    }
</script>


