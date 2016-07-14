<template>
    <kbd>{ {{total | incomeTitleFormat }}了 <em>{{$abs(total) | currency '¥'}} </em> }</kbd>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    kbd {
        font-size: 24px;
        padding: 2px 8px 4px 8px;
        font-family: inherit;
        margin-left: 15px;
        border-radius: 4px;
        em {
            color: lightcoral;
            font-style: normal;
        }
    }
</style>
<script type="text/babel">
    import outlay from 'data/outlay.json'

    export default {
        props:['start', 'end'],
        computed:{
            total(){
                let arr = [];
                Object.keys(outlay).forEach((key)=>{
                    key = Number(key);
                    !(key < this.start || key > this.end) && arr.push(this.$getTotal(outlay[key], 'spend'));
                });
                return this.$getTotal(arr);
            }
        },
        components: {}
    }
</script>