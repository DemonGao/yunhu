<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
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
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';

    html, body, #app {
        width: 100%;
        height: 100%;
        background-color: #fbf9fe;
    }

    /*DemonGao UI 库*/
    .demonUI {
        // 表单
        .dm-input {
            .weui-cells {
                display: flex;
                flex-flow: row nowrap;
                background-color: transparent;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                &:before {
                    display: none;
                }
                .weui-cell{
                    flex:1;
                }
            }

            &.dm-input-placeholder-white{
                .weui-cells {
                    &:after{
                        color: #ffffff;
                        border-bottom: 2px solid #ffffff;
                    }
                }
                .weui-input{
                    &::-webkit-input-placeholder{
                        color: rgba(255, 255, 255,1);
                        font-weight: 100;
                    }
                    &:-ms-input-placeholder{
                        color: rgba(255, 255, 255,1);
                        font-weight: 100;
                    }
                    &:-moz-placeholder{
                        color: rgba(255, 255, 255,1);
                        font-weight: 100;
                    }
                    &::-moz-placeholder{
                        color: rgba(255, 255, 255,1);
                        font-weight: 100;
                    }
                }
            }
        }
    }
</style>
