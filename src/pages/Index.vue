<style lang="less" rel="stylesheet/less" scoped="scoped">
    .Index {
        @defaultFontColor: #969696;
        @color: #31a9de;
        height: 100%;
        background-color: #ffffff;
        /*banner*/
        .Index_banner {
            height: 30vh;
            line-height: 0;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        /*滚动广告*/
        .Index_marquee {
            display: flex;
            flex-flow: row nowrap;
            padding: 0 10px;
            .icon {
                flex: 1;
                margin-right: .5em;
                i.iconfont {
                    color: @color;
                    font-size: 16px;
                }
            }
            .marquee {
                font-size: 12px;
                line-height: 25px;
                color: @defaultFontColor;

                span {
                    color: @color;
                }
            }
        }
        /*主要内容(认证过程, 申请按钮)*/
        .Index_content {
            background-color: #fbf9fe;
            /*建议 suggest*/
            .suggest {
                padding: 30px 0;
                color: @defaultFontColor;
                font-size: 14px;
                text-align: center;
                position: relative;
                &:before {
                    content: ' ';
                    height: 1px;
                    border-bottom: 1px solid #efefef;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                }
            }
            /*审核步骤*/
            .auditSteps {

                .item {
                    padding: 30px 0;
                    text-align: center;
                    line-height: 1em;
                    i.iconfont {
                        color: @color;
                        font-size: 25px;
                    }
                    p {
                        margin-top: 5px;
                        color: #333;
                        font-size: 14px;
                    }
                    span {
                        margin-top: 5px;
                        color: @defaultFontColor;
                        font-size: 12px;
                    }
                }
                .itemIcon {
                    i.iconfont {
                        color: @color;
                        font-size: 18px;
                    }
                }
            }
            /*申请借贷/查询进度*/
            .applyAndQuery {
                padding: 35px 20px 20px 20px;
                box-sizing: border-box;
                background-color: #ffffff;
                .btns {
                    text-align: center;
                    font-size: 16px;
                    .applyBtn {
                        padding: 10px;
                        -webkit-border-radius: 10px 0 0 10px;
                        -moz-border-radius: 10px 0 0 10px;
                        border-radius: 10px 0 0 10px;
                        background-color: #eddb4a;
                        font-weight: 400;
                    }
                    .queryBtn {
                        padding: 10px;
                        background-color: @color;
                        -webkit-border-radius: 0 10px 10px 0;
                        -moz-border-radius: 0 10px 10px 0;
                        border-radius: 0 10px 10px 0;
                        color: #ffffff;
                        font-weight: 300;
                    }
                }
                .desc {
                    margin-top: 10px;
                    font-size: 12px;
                    color: @defaultFontColor;
                    text-align: center;
                    span {
                        color: @color;
                    }
                }
            }
        }
        /*footer*/
        .Index_footer {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
            font-size: 12px;
            color: @defaultFontColor;
            text-align: center;

            span {
                color: @color;
            }
        }
    }
</style>

<template>
    <div class="demonUI Index">
        <!--banner-->
        <div class="Index_banner">
            <img :src="bg"/>
        </div>
        <!--滚动广告-->
        <div class="Index_marquee">
            <div class="icon">
                <i class="iconfont icon-tongzhi"></i>
            </div>
            <marquee class="marquee">
                <marquee-item>
                    用户必读
                    <router-link :to="{name: 'Clause'}" tag="span" style="font-weight: 300;">《隐私条款》</router-link>
                    和
                    <router-link :to="{name: 'Protocol'}" tag="span" style="font-weight: 300;">《优速金融协议》</router-link>
                </marquee-item>
                <!--<marquee-item>-->
                <!--用户必知 <span>《隐私协议》</span>-->
                <!--</marquee-item>-->
            </marquee>
        </div>
        <!--主要内容(建议 -> 认证过程 -> 申请借贷/查询进度)-->
        <div class="Index_content">
            <!--建议-->
            <div class="suggest">
                认证信息越完善，审核通过率越高额！
            </div>
            <!--认证过程-->
            <flexbox class="auditSteps" :gutter="0">
                <!--基础认证-->
                <flexbox-item class="item"
                              @click.native="routerLink('ApplyBaseInfo', {}, {checkway: $route.query.checkway})">
                    <i class="iconfont icon-credentials_icon"></i>
                    <p>基础信息</p>
                    <span>获取基础信息</span>
                </flexbox-item>
                <!--图标-->
                <flexbox-item class="itemIcon" :span="1">
                    <i class="iconfont icon-tiaozhuandaomulu"></i>
                </flexbox-item>
                <!--芝麻认证-->
                <flexbox-item class="item"
                              @click.native="routerLink('ApplySupplementInfo', {}, {checkway: $route.query.checkway})">
                    <i class="iconfont icon-zhimaxinyong"></i>
                    <p>补充信息</p>
                    <span>获取补充信息</span>
                </flexbox-item>
                <!--图标-->
                <flexbox-item class="itemIcon" :span="1">
                    <i class="iconfont icon-tiaozhuandaomulu"></i>
                </flexbox-item>
                <!--通话认证-->
                <flexbox-item class="item"
                              @click.native="routerLink('SelectAuth', {}, {checkway: $route.query.checkway})">
                    <i class="iconfont icon-tonghuajilu"></i>
                    <p>第三方认证</p>
                    <span>获取认证信息</span>
                </flexbox-item>
            </flexbox>
            <!--申请借贷/查询进度-->
            <div class="applyAndQuery">
                <flexbox class="btns" :gutter="0">
                    <flexbox-item class="applyBtn" :span="3/5" @click.native="applyForLoan">申请借贷
                    </flexbox-item>
                    <flexbox-item class="queryBtn">查询进度</flexbox-item>
                </flexbox>
                <p class="desc">
                    本次借贷全程由<span>{{compnay_name}}</span>服务提供
                </p>
            </div>

        </div>
        <div class="Index_footer">
            本应用技术开发与支持 由<span>《云狐科技》</span>提供
        </div>
    </div>
</template>

<script>
    import {Marquee, MarqueeItem, Flexbox, FlexboxItem, Divider} from 'vux'
    import UtilMixin from '@/mixins/UtilMixin.vue'

    export default {
        mixins: [UtilMixin],
        props: ['identification'],
        data() {
            return {
                customer_id: null,
                bg: null,
                compnay_name: ''
            }
        },
        components: {
            Marquee,
            MarqueeItem,
            Flexbox,
            FlexboxItem,
            Divider
        },
        computed: {},
        methods: {
            applyForLoan() {
                let _this = this
                if (this.customer_id) {
                    _this.routerLink('ApplyBaseInfo', {}, {checkway: this.$route.query.checkway})
                } else {
                    this.$vux.confirm.show({
                        title: '提示',
                        content: '您还没有登录,请先登录!',
                        onCancel() {
                        },
                        onConfirm() {
                            _this.routerLink('Login', {identification: _this.identification}, {checkway: _this.$route.query.checkway})
                        }
                    })
                }
            },
            checkApproveInfo() {
                this.$axios.post({
                    url: '/check_approve_info'
                })
            },
            checkIdentification() {
                this.$axios.post({
                    url: '/check_identification/',
                    data: {
                        identification: this.$route.params.identification
                    }
                }).then(res => {
                    console.log(res)
                })
            }
        },
        created() {
            this.customer_id = localStorage.getItem('yunhu!customer_id')
            if (this.$route.meta.pageMsg) {
                this.bg = this.$route.meta.pageMsg.img2
                this.compnay_name = this.$route.meta.pageMsg.name
            } else {
                this.$axios.post({
                    url: `/customermodel/get_company/`,
                    data: {
                        identification: this.identification
                    },
                    isloadding: true
                }).then(res => {
                    this.bg = res.img2
                    this.compnay_name = res.name
                })
            }
        },
        mounted() {
            this.checkIdentification()
        }
    }
</script>

