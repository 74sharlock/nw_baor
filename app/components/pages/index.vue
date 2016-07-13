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
    import outlay from 'data/outlay.json'

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
                let arr = [], total = 0;
                Object.keys(outlay).forEach((key)=>{
                    key = Number(key);
                    !(key < start || key > end) && arr.push(this.$getTotal(outlay[key], 'spend'));
                });
                total = this.$getTotal(arr);
                return `<span style="font-size: 16px;color: crimson;">${total > 0 ? '支出': '收入'}了${this.$abs(total)}</span>`;
            }
        },
        components: {
            calendar,
            todayOutlay
        }
    }
</script>