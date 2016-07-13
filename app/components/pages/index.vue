<template>
    <div class="container">
        <calendar :item-component="$options.components.todayOutlay" @item-click="go" :data-month-handler="dataMonthHandler"></calendar>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .container {
        width: 100%;
        height: 100%;
    }
</style>
<script type="text/babel">
    import calendar from '../calendar/'
    import todayOutlay from '../today-outlay'

    export default {
        data () {
            return {
            }
        },
        methods:{
            go(date){
                this.$router.go(`/detail/${new Date(date).getTime()}`);
            },
            dataMonthHandler(start, end){
                return `---${start}, ${end}`;
            }
        },
        components: {
            calendar,
            todayOutlay
        }
    }
</script>