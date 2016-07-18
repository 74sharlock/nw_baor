<template>
    <div class="page member">
        <div class="list">
            <div class="item" v-for="man in members">
                <div class="block">
                    <div class="avatar"><i :style="{backgroundImage: 'url(' + $avatar(man.avatar) + ')'}"></i></div>
                    <div class="name">{{man.name}}</div>
                    <div class="count"><span>{{man.count}}</span>笔记录</div>
                    <div class="spend">共支出了<span>{{$encodeFen(man.spend) | currency '¥'}}</span></div>
                    <div class="income">共收入了<span>{{$encodeFen(man.income) | currency '¥'}}</span></div>
                    <div class="mostSpend">主要花费在<span class="ui tips top" title="{{man.mostSpend.value}}">{{catResolve(man.mostSpend.key)}}</span>[方面</div>
                    <div class="maxSpend">最多的一次支出:<span class="ui tips top" title="{{man.maxSpend.key}}">{{$encodeFen(man.maxSpend.value) | currency '¥'}}</span></div>
                    <div class="maxIncome">最多的一次收入:<span class="ui tips top" title="{{man.maxIncome.key}}">{{$encodeFen(man.maxIncome.value) | currency '¥'}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import '../../assets/var';

    .page.member {
        width: 100%;
        .list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 20px 0 0 20px;
            .item {
                width: 25%;
                padding: 0 20px 20px 0;
                .block {
                    width: 100%;
                    padding: 20px 0;
                    border: 1px solid #dfdfdf;
                    border-radius: 4px;
                    background-color: #fff;
                    .boxShadowForBlock();
                    .name, .avatar, .count, .spend, .income, .mostSpend, .maxSpend, .maxIncome {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-bottom: 15px;
                        span {
                            color: lightcoral;
                            font-size: 18px;
                        }
                    }
                    .avatar {
                        > i {
                            display: inline-block;
                            width: 64px;
                            height: 64px;
                            border-radius: 50%;
                            background: no-repeat center;
                            background-size: cover;
                            border: 2px solid cornsilk;
                            .boxShadowForBlock(.5);
                        }
                    }
                    .name {
                        font-size: 24px;
                    }
                    .count {
                        span {
                            color: @linkColor;
                        }
                    }
                }
            }
        }
    }
</style>
<script type="text/babel">
    import outlay from 'data/outlay.json'
    import members from 'data/member.json'
    import cats from 'data/category.json'
    import dateFormat from 'dateformat'

    export default {
        computed:{
            members(){
                let arr = [];
                members.forEach((man, index)=>{
                    let data = this.initData(index);
                    arr.push({
                        name: man.name,
                        avatar: man.avatar,
                        count: data.count,
                        spend: data.spend,
                        income: data.income,
                        mostSpend: data.mostSpend,
                        maxSpend: data.maxSpend,
                        maxIncome: data.maxIncome
                    })
                });
                return arr;
            }
        },
        methods: {
            initData(id){
                let count = 0, spend = 0, income = 0, mostSpend = {key: null, value: 0}, maxSpend = {key: null, value: 0}, maxIncome = {key: null, value: 0}, cat = {};
                Object.keys(outlay).forEach((key)=>{

                    let dayOutlay = outlay[key];


                    dayOutlay.forEach((item)=>{
                        if(String(item.member) === String(id)){
                            //消费支出总数++;
                            count ++;

                            let spendNum = Number(item.spend);
                            if(item.spend && !isNaN(spendNum)){
                                // 如果是支出
                                if(spendNum >=0){
                                    // 支出+
                                    spend += spendNum;
                                    // 如果最大支出比本次支出小则最大支出等于本次支出
                                    maxSpend.value < spendNum && (maxSpend = {key: dateFormat(Number(key), 'yyyy年mm月dd日'), value: spendNum});
                                } else {
                                    // 收入+绝对值
                                    income += this.$abs(spendNum);
                                    maxIncome.value < this.$abs(spendNum) && (maxIncome = {key: dateFormat(Number(key), 'yyyy年mm月dd日'), value: this.$abs(spendNum)});
                                }
                            }
                            Number(item.spend) > 0 && (this.$getType(cat[item.category]) === 'undefined' ? (cat[item.category] = 0) : (cat[item.category] ++));
                        }
                    });
                });

                let newArr = Object.keys(cat);

                newArr.forEach((key)=>{
                    if(cat[key] > mostSpend.value){
                        mostSpend = {
                            key: key,
                            value: cat[key]
                        }
                    }
                });

                return {
                    count,
                    spend,
                    income,
                    mostSpend,
                    maxSpend,
                    maxIncome
                }
            },
            catResolve(index){
                return cats[index];
            }
        }
    }
</script>