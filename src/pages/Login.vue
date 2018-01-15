<style lang="less" rel="stylesheet/less" scoped="scoped">
    .demonUI {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url("../assets/loginbg.jpg");
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
        }
    }
</style>
<template>
    <div class="demonUI">
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
            <box gap="50px 0 0">
                <x-button type="confirm" :disabled="submitLoadding" :show-loading="submitLoadding"
                          :gradients="['#1D62F0', '#19D5FD']" @click.native="submit"> 登录
                </x-button>
            </box>
        </div>
    </div>

</template>

<script>
    import {XInput, Group, XButton, Box, Countdown} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import FormMixin from '@/mixins/FormMixin.vue'

    export default {
        mixins: [UtilMixin, FormMixin],
        props: ['identification'],
        data() {
            return {
                // 用户名
                tel: '',
                // 密码
                code: '',
                // 发送验证码等待时间
                codeTime: 0
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Box,
            Countdown
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
                    url: '/telcheck/',
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
                this.formMixin_submit('/h5register/')
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
        mounted() {
        }
    }
</script>


