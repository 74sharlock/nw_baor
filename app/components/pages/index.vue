<template>
    <div class="container">
        <calendar></calendar>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .container {
        width: 100%;
        height: 100%;
    }
</style>
<script type="text/babel">
    import outlay from 'data/outlay.json';
    import calendar from '../calendar/'

    export default {
        data () {
            return {

            }
        },
        components: {
            calendar
        }
    }
</script>