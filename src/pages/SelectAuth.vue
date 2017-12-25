<template>
    <div class="selectAuth">
        <grid :cols="4">
            <grid-item
                v-for="(item, index) in authList" :key="index"
                :label="item.label"
                :link="item.link + '&checkway=' + $route.query.checkway"
            >
                <div slot="icon" class="icon">
                    <i :class="['iconfont', item.icon]"></i>
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
                        icon: 'icon-xuexinwang'
                    },
                    {
                        id: 'rhzx',
                        label: '人行征信',
                        link: '/h5AuthPage?partnerId=yousu&source=rhzx',
                        icon: 'icon-renhangzhengxin'
                    },
                    {
                        id: 'mno',
                        label: '运营商',
                        link: '/h5AuthPage?partnerId=yousu&source=mno',
                        icon: 'icon-yunyingshangrenzheng'
                    },
                    {
                        id: 'maimai',
                        label: '脉脉',
                        link: '/h5AuthPage?partnerId=yousu&source=maimai',
                        icon: 'icon-mai'
                    },
                    {
                        id: 'tb',
                        label: '淘宝',
                        link: '/apiTBAuth?',
                        icon: 'icon-taobao'
                    },
                    {
                        id: 'jd',
                        label: '京东',
                        link: '/apiJDAuth?',
                        icon: 'icon-jingdong'
                    },
                    {
                        id: 'gjj',
                        label: '公积金',
                        link: '/apiGJJAuth?',
                        icon: 'icon-gongjijin'
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
            this.checkInfo()
        },
        mounted() {}
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
