<template>
    <header>
        <icon name="smile" size="4"></icon>
    </header>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../assets/var';
    header {
        height: @headerHeight;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        background-color: #2f4050;
        color: #fff;
    }
</style>
<script type="text/babel">
    import Icon from './ui/icon'
    export default {
        data () {
            return {
                
            }
        },
        components: {
            Icon
        }
    }
</script>