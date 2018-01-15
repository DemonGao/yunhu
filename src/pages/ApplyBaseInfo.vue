<style lang="less" rel="stylesheet/less" scoped="scoped">
    .ApplyForLoan {
        @defaultFontColor: #969696;
        @color: #50b97b;
        .dm-input {
            box-sizing: border-box;
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
        <group title="<span style='color:red'>*</span> 姓名" :title-color="groupColor" class="dm-input">
            <x-input
                ref="name"
                name="name"
                v-model="name"
                placeholder="请输入您的真实姓名"
                :required="true"
                @on-enter="nextFocus('tel')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 手机号码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="tel"
                name="tel"
                v-model="tel"
                placeholder="请输入您的手机号码"
                :required="true"
                type="tel"
                @on-enter="nextFocus('identity')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 身份证号码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="identity"
                v-model="identity"
                name="identity"
                placeholder="请输入您的身份证号码"
                :required="true"
                @on-enter="nextFocus('zhima_score')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 芝麻信用分" :title-color="groupColor" class="dm-input">
            <x-input
                ref="zhima_score"
                v-model="zhima_score"
                name="zhima_score"
                placeholder="请输入您的芝麻信用分"
                :required="true"
                type="number"
                @on-enter="nextFocus('wechat')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 微信号" :title-color="groupColor" class="dm-input">
            <x-input
                ref="wechat"
                v-model="wechat"
                name="wechat"
                placeholder="请输入您的微信号"
                :required="true"
                @on-enter="nextFocus('address')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 详细地址" :title-color="groupColor" class="dm-input">
            <x-input
                ref="address"
                name="address"
                v-model="address"
                placeholder="请输入您的详细地址"
                :required="true"
            ></x-input>
        </group>
        <!--身份证正面照-->
        <group title="<span style='color:red'>*</span> <i class='iconfont icon-credentials_icon'> 请上传清晰可见的身份证正面照"
               :title-color="groupColor"
               class="dm-input">
            <x-input
                style="display: none"
                ref="idcard_pic"
                name="idcard_pic"
                v-model="idcard_pic"
                :required="true"
                placeholder="请上传清晰可见的身份证正面照"
            ></x-input>
            <div class="uploadImg">
                <div class="item">
                    <div class="content add">
                        <label for="img-upload-idcard_pic">
                            <upload-img
                                model-name="idcard_pic"
                                @changeImg="changeImg"
                            ></upload-img>
                            <i class="iconfont icon-zhaoxiang"></i><br>
                            <span>请选择图片</span>
                        </label>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <img :src="idcard_pic" alt="">
                    </div>
                </div>
                <div class="item"></div>
                <div class="item">
                    <div class="content"></div>
                </div>
            </div>
        </group>
        <!--身份证反面照-->
        <group title="<span style='color:red'>*</span> <i class='iconfont icon-credentials_icon'> 请上传清晰可见的身份证反面照"
               :title-color="groupColor"
               class="dm-input">
            <x-input
                style="display: none"
                ref="idcard_backpic"
                name="idcard_backpic"
                v-model="idcard_backpic"
                :required="true"
                placeholder="请上传清晰可见的身份证反面照"
            ></x-input>
            <div class="uploadImg">
                <div class="item">
                    <div class="content add">
                        <label for="img-upload-idcard_backpic">
                            <upload-img
                                model-name="idcard_backpic"
                                @changeImg="changeImg"
                            ></upload-img>
                            <i class="iconfont icon-zhaoxiang"></i><br>
                            <span>请选择图片</span>
                        </label>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <img :src="idcard_backpic" alt="">
                    </div>
                </div>
                <div class="item"></div>
                <div class="item">
                    <div class="content"></div>
                </div>
            </div>
        </group>
        <!--手持身份证照-->
        <group title="<span style='color:red'>*</span> <i class='iconfont icon-credentials_icon'> 请上传清晰可见的身份证反面照"
               :title-color="groupColor"
               class="dm-input">
            <x-input
                style="display: none"
                ref="idcard_people_pic"
                name="idcard_people_pic"
                v-model="idcard_people_pic"
                :required="true"
                placeholder="请上传清晰可见的身份证反面照"
            ></x-input>
            <div class="uploadImg">
                <div class="item">
                    <div class="content add">
                        <label for="img-upload-idcard_people_pic">
                            <upload-img
                                model-name="idcard_people_pic"
                                @changeImg="changeImg"
                            ></upload-img>
                            <i class="iconfont icon-zhaoxiang"></i><br>
                            <span>请选择图片</span>
                        </label>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <img :src="idcard_people_pic" alt="">
                    </div>
                </div>
                <div class="item"></div>
                <div class="item">
                    <div class="content"></div>
                </div>
            </div>
        </group>
        <box gap="20px">
            <x-button type="confirm" :disabled="submitLoadding" :show-loading="submitLoadding"
                      :gradients="['#50b97b', '#19D5FD']" @click.native="submit"> 下一步
            </x-button>
        </box>
    </div>
</template>

<script>
    /* eslint-disable indent,camelcase */

    import {XInput, Group, XButton, Box, Flexbox, FlexboxItem} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import UploadImg from '@/components/uploadImg/uploadImg.vue'
    import FormMixin from '@/mixins/FormMixin.vue'

    export default {
        mixins: [UtilMixin, FormMixin],
        data() {
            return {
                groupColor: '#50b97b',
                name: null,
                tel: null,
                identity: null,
                zhima_score: null,
                wechat: null,
                address: null,
                idcard_pic: '',
                idcard_backpic: '',
                idcard_people_pic: '',
                type: 0
            }
        },
        components: {
            XInput,
            Group,
            XButton,
            Box,
            Flexbox,
            FlexboxItem,
            UploadImg
        },
        computed: {},
        methods: {
            changeImg(data, nodelName) {
                console.log(nodelName)
                if (nodelName !== 'undefined') {
                    this[nodelName] = data
                }
                console.log(this[nodelName])
            },
            submit() {
                this.formMixin_submit('/update_base_info/')
                    .then(() => {
                        const _this = this
                        this.$vux.toast.show({
                            text: '提交成功',
                            time: 500,
                            onHide () {
                                _this.routerLink('ApplySupplementInfo', {}, {checkway: _this.$route.query.checkway})
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(`code:${err.code} \n msg:${err.msg}`)
                    })
            },
            checkInfo() {
                this.$axios.post({
                    url: '/check_base_info/',
                    data: {
                        customer_id: parseInt(localStorage.getItem('yunhu!customer_id'))
                    }
                }).then(res => {
                    this.name = res.name
                    this.tel = res.tel
                    this.identity = res.identity
                    this.zhima_score = res.zhima_score
                    this.wechat = res.wechat
                    this.address = res.address

                    this.idcard_pic = res.idcard_pic
                    this.idcard_backpic = res.idcard_backpic
                    this.idcard_people_pic = res.idcard_people_pic
                })
            }
        },
        created() {
            this.checkInfo()
        },
        mounted() {
        }
    }
</script>
