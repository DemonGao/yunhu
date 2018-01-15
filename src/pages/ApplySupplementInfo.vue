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
        <group title="<span style='color:red'>*</span> 父亲姓名" :title-color="groupColor" class="dm-input">
            <x-input
                ref="father_name"
                name="father_name"
                v-model="father_name"
                placeholder="请输入您父亲的真实姓名"
                :required="true"
                @on-enter="nextFocus('father_tel')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 父亲电话" :title-color="groupColor" class="dm-input">
            <x-input
                ref="father_tel"
                name="father_tel"
                v-model="father_tel"
                placeholder="请输入您父亲的电话号码"
                :required="true"
                type="tel"
                @on-enter="nextFocus('mother_name')"
            ></x-input>
        </group>

        <group title="<span style='color:red'>*</span> 母亲姓名" :title-color="groupColor" class="dm-input">
            <x-input
                ref="mother_name"
                name="mother_name"
                v-model="mother_name"
                placeholder="请输入您母亲的真实姓名"
                :required="true"
                @on-enter="nextFocus('mother_tel')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 母亲电话" :title-color="groupColor" class="dm-input">
            <x-input
                ref="mother_tel"
                name="mother_tel"
                v-model="mother_tel"
                placeholder="请输入您母亲的电话号码"
                :required="true"
                type="tel"
                @on-enter="nextFocus('friend_name')"
            ></x-input>
        </group>

        <group title="<span style='color:red'>*</span> 朋友姓名( 联系最频繁 )" :title-color="groupColor" class="dm-input">
            <x-input
                ref="friend_name"
                name="friend_name"
                v-model="friend_name"
                placeholder="请输入您朋友的真实姓名"
                :required="true"
                @on-enter="nextFocus('friend_tel')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 朋友电话( 联系最频繁 )" :title-color="groupColor" class="dm-input">
            <x-input
                ref="friend_tel"
                name="friend_tel"
                v-model="friend_tel"
                placeholder="请输入您朋友的电话号码"
                :required="true"
                type="tel"
                @on-enter="nextFocus('colleague_name')"
            ></x-input>
        </group>

        <group title="<span style='color:red'>*</span> 同事姓名( 联系最频繁 )" :title-color="groupColor" class="dm-input">
            <x-input
                ref="colleague_name"
                name="colleague_name"
                v-model="colleague_name"
                placeholder="请输入您同事的真实姓名"
                :required="true"
                @on-enter="nextFocus('colleague_tel')"
            ></x-input>
        </group>
        <group title="<span style='color:red'>*</span> 同事电话( 联系最频繁 )" :title-color="groupColor" class="dm-input">
            <x-input
                ref="colleague_tel"
                name="colleague_tel"
                v-model="colleague_tel"
                placeholder="请输入您同事的电话号码"
                :required="true"
                type="tel"
                @on-enter="nextFocus('company_name')"
            ></x-input>
        </group>

        <group title="公司名称" :title-color="groupColor" class="dm-input">
            <x-input
                ref="company_name"
                name="company_name"
                v-model="company_name"
                placeholder="请输入您公司名称"
                :required="false"
                @on-enter="nextFocus('company_tel')"
            ></x-input>
        </group>
        <group title="公司电话" :title-color="groupColor" class="dm-input">
            <x-input
                ref="company_tel"
                name="company_tel"
                v-model="company_tel"
                placeholder="请输入您公司的电话号码"
                :required="false"
                type="tel"
                @on-enter="nextFocus('company_address')"
            ></x-input>
        </group>

        <group title="公司地址" :title-color="groupColor" class="dm-input">
            <x-input
                ref="company_address"
                name="company_address"
                v-model="company_address"
                placeholder="请输入您公司地址"
                :required="false"
                @on-enter="nextFocus('company_salary')"
            ></x-input>
        </group>

        <group title="薪水(年薪)" :title-color="groupColor" class="dm-input">
            <x-input
                ref="company_salary"
                name="company_salary"
                v-model="company_salary"
                placeholder="请输入您的年薪"
                :required="false"
                type="number"
            ></x-input>
        </group>

        <!--芝麻信用分-->
        <group title="<span style='color:red'>*</span> <i class='iconfont icon-credentials_icon'> 请上传清晰可见的支付宝芝麻信用分数页"
               :title-color="groupColor"
               class="dm-input">
            <x-input
                style="display: none"
                ref="zfb_score_pic"
                name="zfb_score_pic"
                v-model="zfb_score_pic"
                :required="true"
                placeholder="请上传清晰可见的支付宝芝麻信用分数页"
            ></x-input>
            <div class="uploadImg">
                <div class="item">
                    <div class="content add">
                        <label for="img-upload-zfb_score_pic">
                            <upload-img
                                model-name="zfb_score_pic"
                                @changeImg="changeImg"
                            ></upload-img>
                            <i class="iconfont icon-zhaoxiang"></i><br>
                            <span>请选择图片</span>
                        </label>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <img :src="zfb_score_pic" alt="">
                    </div>
                </div>
                <div class="item"></div>
                <div class="item">
                    <div class="content"></div>
                </div>
            </div>
        </group>
        <!--支付宝信用管理页-->
        <group title="<span style='color:red'>*</span> <i class='iconfont icon-credentials_icon'> 请上传清晰可见的支付宝信用管理页(支付宝 - 我的 - 芝麻信用 - 信用管理)"
               :title-color="groupColor"
               class="dm-input">
            <x-input
                style="display: none"
                ref="zfb_manage_pic"
                name="zfb_manage_pic"
                v-model="zfb_manage_pic"
                :required="true"
                placeholder="请上传清晰可见的身份证反面照"
            ></x-input>
            <div class="uploadImg">
                <div class="item">
                    <div class="content add">
                        <label for="img-upload-zfb_manage_pic">
                            <upload-img
                                model-name="zfb_manage_pic"
                                @changeImg="changeImg"
                            ></upload-img>
                            <i class="iconfont icon-zhaoxiang"></i><br>
                            <span>请选择图片</span>
                        </label>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <img :src="zfb_manage_pic" alt="">
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
                father_name: null,
                father_tel: null,
                mother_name: null,
                mother_tel: null,
                friend_name: null,
                friend_tel: null,
                colleague_name: null,
                colleague_tel: null,
                company_name: null,
                company_tel: null,
                company_address: null,
                company_salary: null,
                zfb_score_pic: '',
                zfb_manage_pic: '',
                type: 1
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
                this.formMixin_submit('/update_supplement_info/')
                    .then((res) => {
                        const _this = this
                        this.$vux.toast.show({
                            text: '提交成功',
                            time: 500,
                            onHide () {
                                _this.routerLink('SelectAuth', {}, {checkway: _this.$route.query.checkway})
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(`code:${err.code} \n msg:${err.msg}`)
                    })
            },
            checkInfo() {
                this.$axios.post({
                    url: '/check_supplement_info/',
                    data: {
                        customer_id: parseInt(localStorage.getItem('yunhu!customer_id'))
                    }
                }).then(res => {
                    this.father_name = res.father_name
                    this.father_tel = res.father_tel
                    this.mother_name = res.mother_name
                    this.mother_tel = res.mother_tel
                    this.friend_name = res.friend_name
                    this.friend_tel = res.friend_tel
                    this.colleague_name = res.colleague_name
                    this.colleague_tel = res.colleague_tel
                    this.company_name = res.company_name
                    this.company_tel = res.company_tel
                    this.company_address = res.company_address
                    this.company_salary = res.company_salary
                    this.zfb_score_pic = res.zfb_score_pic
                    this.zfb_manage_pic = res.zfb_manage_pic
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
