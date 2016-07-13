<template>
    <div class="today-outlay">
        <div v-if="total" class="hasData">
            <span class="action">{{total > 0 ? '支出': '收入'}}了</span>
            <span class="price">{{$abs(total) | currency '¥'}}</span>
        </div>
        <span v-if="!total" class="no-data">无消费</span>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .today-outlay {
        width: 100%;
        display: flex;
        height: 100%;
        .hasData {
            width: 100%;
            display: flex;
            flex-direction: column;
            .action, .price {
                display: flex;
                justify-content: center;
            }
            .action {
                padding: 5px 0;
                font-size: 1.3em;
                align-items: center;
            }
            .price {
                height: 100%;
                color: crimson;
                font-size: 2em;
                padding-top: 20px;
            }
        }
        .no-data {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 30px;
        }
    }
</style>
<script type="text/babel">
    import outlay from 'data/outlay.json';

    export default {
        props:['date'],
        data () {
            return {
                total: this.$getTotal(outlay[this.date.timeStamp], 'spend')
            }
        }
    }
</script>