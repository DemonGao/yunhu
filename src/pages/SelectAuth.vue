<template>
    <div class="selectAuth">
        <grid :cols="4">
            <grid-item label="学信网" link="https://credit.baiqishi.com/clclient/common/basic?partnerId=yousu&source=chsi">
                <div slot="icon" class="icon">
                    <i class="iconfont icon-xuexinwang"></i>
                </div>
            </grid-item>
            <grid-item label="人行征信" link="https://credit.baiqishi.com/clclient/common/basic?partnerId=yousu&source=rhzx">
                <div class="icon" slot="icon">
                    <i class="iconfont icon-renhangzhengxin"></i>
                </div>
            </grid-item>
            <grid-item label="运营商" link="https://credit.baiqishi.com/clclient/common/basic?partnerId=yousu&source=mno">
                <div class="icon" slot="icon">
                    <i class="iconfont icon-yunyingshangrenzheng"></i>
                </div>
            </grid-item>
            <grid-item label="脉脉" link="https://credit.baiqishi.com/clclient/common/basic?partnerId=yousu&source=maimai">
                <div class="icon" slot="icon">
                    <i class="iconfont icon-mai"></i>
                </div>
            </grid-item>
        </grid>
    </div>
</template>

<script>
    import {Grid, GridItem} from 'vux'

    export default {
        data() {
            return {}
        },
        components: {
            Grid,
            GridItem
        },
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
    .selectAuth {
        .icon {
            text-align: center;
            i.iconfont {
                font-size: 24px;
            }
        }
    }

</style>
