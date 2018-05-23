<style lang="less" rel="stylesheet/less" scoped="scoped">
    .contactUs{
        height: 100%;
        overflow: hidden;
        a{
            color: inherit;
        }
        .box{
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin-top: 20px;
            padding:10px 15px;
            background-color: #ffffff;
            box-shadow: 0 0 20px -6px #ccc;
            .box__left{
                width: 60px;
                i.iconfont{
                    font-size: 30px;
                    &.icon-qq{
                        color: #669ad2;
                    }
                    &.icon-logo-wechat{
                        color: #60a347;
                    }
                }
            }
            .box__content{
                flex: 1;
                display: flex;
                flex-flow: column nowrap;
                align-items: flex-start;
                .box__content__title{
                    position: relative;
                    width: 100%;
                    font-size: 16px;
                    padding:0 0 8px;
                    &:after{
                        content: ' ';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 1px;
                        background-color: #efefef;
                        overflow: hidden;
                        transform: scaleY(.5);
                    }
                }
                .box__content__number{
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding:8px 0 0;
                    font-size: 14px;
                    font-weight: 300;
                    color: #999999;
                    img{
                        height: 250px;
                    }
                }
                .box__content__tips{
                    font-size: 14px;
                    font-weight: 300;
                    color: #999999;
                }
            }
        }
    }
</style>
<template>
    <div class="contactUs">
        <div class="box">
            <div class="box__left">
                <i class="iconfont icon-qq "></i>
            </div>
            <div class="box__content">
                <div class="box__content__title">QQ在线客服</div>
                <div class="box__content__number">
                    <div>598065453</div>
                    <div>
                        <a href="http://wpa.qq.com/msgrd?v=3&uin=1239300678&site=qq&menu=yes">点此联系</a></div>
                </div>
            </div>
        </div>

        <div class="box">
            <div class="box__left">
                <i class="iconfont icon-logo-wechat"></i>
            </div>
            <div class="box__content">
                <div class="box__content__title">微信客服</div>
                <div class="box__content__number">
                    <img src="http://sms.yunhushuju.com/media/kefu_main.jpg" alt="">
                </div>
                <div class="box__content__tips">
                    请在微信中,长按识别二维码
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
