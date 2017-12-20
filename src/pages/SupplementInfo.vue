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
                    &.add{
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
        <group title="姓名" :title-color="groupColor" class="dm-input">
            <x-input
                ref="name"
                name="name"
                v-model="name"
                placeholder="请输入您的真实姓名"
                :required="true"
                @on-enter="nextFocus('tel')"
            ></x-input>
        </group>
        <group title="手机号码" :title-color="groupColor" class="dm-input">
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
        <group title="身份证号码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="identity"
                v-model="identity"
                name="identity"
                placeholder="请输入您的身份证号码"
                :required="true"
                @on-enter="nextFocus('qq')"
            ></x-input>
        </group>
        <group title="QQ号码" :title-color="groupColor" class="dm-input">
            <x-input
                ref="qq"
                v-model="qq"
                name="qq"
                placeholder="请输入您的QQ号码"
                :required="true"
                type="number"
                @on-enter="nextFocus('want_blance')"
            ></x-input>
        </group>
        <group title="借款金额" :title-color="groupColor" class="dm-input">
            <x-input
                ref="want_blance"
                name="want_blance"
                v-model="want_blance"
                placeholder="请输入您需要借款的金额"
                :required="true"
                type="number"
            ></x-input>
        </group>
        <!--身份证正面照-->
        <group title="<i class='iconfont icon-credentials_icon'> 请上传清晰可见的身份证正面照" :title-color="groupColor"
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
                    <div class="content">示例照片</div>
                </div>
            </div>
        </group>
        <!--身份证反面照-->
        <group title="<i class='iconfont icon-credentials_icon'> 请上传清晰可见的身份证反面照" :title-color="groupColor"
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
                    <div class="content">示例照片</div>
                </div>
            </div>
        </group>
        <!--手持身份证照-->
        <group title="<i class='iconfont icon-credentials_icon'> 请上传清晰可见的身份证反面照" :title-color="groupColor"
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
                    <div class="content">示例照片</div>
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
                qq: null,
                identity: null,
                want_blance: null,
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
                this.formMixin_submit('/yunhu/customer_update/')
                    .then(() => {
                        this.$router.push({name: 'Index'})
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
