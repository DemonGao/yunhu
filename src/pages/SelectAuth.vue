<style lang="less" rel="stylesheet/less" scoped="scoped">
    .selectAuth {
        .icon {
            position: relative;
            top: -15px;
            text-align: center;
            i.iconfont {
                font-size: 34px;
            }
        }
        .label{
            color: #333;
        }
    }

</style>
<template>
    <div class="selectAuth">
        <grid :cols="4">
            <grid-item
                v-for="(item, index) in authList" :key="index"
                :link="item.link + '&checkway=' + $route.query.checkway + '&title=' + item.label"
            >
                <div slot="icon" class="icon">
                    <i :class="['iconfont', item.icon]" :style="{color: item.color}"></i>
                </div>
                <div slot="label" class="label">
                    {{item.label}}
                </div>
            </grid-item>
        </grid>
    </div>
</template>

<script>
    import {Grid, GridItem} from 'vux'

    export default {
        data() {
            return {
                auths: [
                    {
                        id: 'chsi',
                        label: '学信网',
                        link: '/h5AuthPage?partnerId=yousu&source=chsi',
                        icon: 'icon-xuexinwang',
                        color: '#45b4b3'
                    },
                    {
                        id: 'rhzx',
                        label: '人行征信',
                        link: '/h5AuthPage?partnerId=yousu&source=rhzx',
                        icon: 'icon-renhangzhengxin',
                        color: '#FF7676'
                    },
                    {
                        id: 'mno',
                        label: '运营商',
                        link: '/h5AuthPage?partnerId=yousu&source=mno',
                        icon: 'icon-yunyingshangrenzheng',
                        color: '#22B7DB'
                    },
                    {
                        id: 'maimai',
                        label: '脉脉',
                        link: '/h5AuthPage?partnerId=yousu&source=maimai',
                        icon: 'icon-mai',
                        color: '#348bdf'
                    },
                    {
                        id: 'tb',
                        label: '淘宝',
                        link: '/apiTBAuth?',
                        icon: 'icon-taobao',
                        color: '#ef612b'
                    },
                    {
                        id: 'jd',
                        label: '京东',
                        link: '/apiJDAuth?',
                        icon: 'icon-jingdong',
                        color: '#d3362a'
                    },
                    {
                        id: 'gjj',
                        label: '公积金',
                        link: '/apiGJJAuth?',
                        icon: 'icon-gongjijin',
                        color: '#FFB232'
                    }
                ]
            }
        },
        components: {
            Grid,
            GridItem
        },
        computed: {
            authList() {
                const checkway = this.$route.query.checkway.split(',')
                let authList = []
                this.auths.map(item => {
                    if (checkway.includes(item.id)) {
                        authList.push(item)
                    }
                })
                return authList
            },
            checkInfo() {
                this.$axios.post({
                    url: '/check_approve_info/',
                    data: {
                        customer_id: parseInt(localStorage.getItem('yunhu!customer_id'))
                    }
                }).then(res => {
                    console.log(res)
                })
            }
        },
        methods: {},
        created() {
//            this.checkInfo()
        },
        mounted() {}
    }
</script>
