<style lang="less" rel="stylesheet/less" scoped="scoped">
    .h5AuthPage{
        height: 100%;
        .iframe{
            width:100%;

            height:calc(~'100% - 69px');
        }
    }
</style>
<template>
    <div class="h5AuthPage">
        <iframe
            class="iframe"
            frameborder="0"
            :src="'https://credit.baiqishi.com/clclient/common/basic?partnerId=' + $route.query.partnerId+'&source=' + $route.query.source"
        >
        </iframe>
        <box gap="10px 10px">
            <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="$router.push({name: 'SelectAuth', query: {checkway: $route.query.checkway}})">返回认证</x-button>
        </box>
    </div>
</template>

<script>
    import { XButton, Box } from 'vux'
    export default {
        data() {
            return {

            }
        },
        components: {
            XButton,
            Box
        },
        computed: {},
        methods: {

        },
        mounted() {
        }
    }
</script>
