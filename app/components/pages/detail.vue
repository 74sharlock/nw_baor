<template>
    <div class="page detail">
        <div class="list">
            <div class="item" v-for="item in list">
                <div class="block">
                    <div class="member">
                        <span v-if="!item.modify"><i class="avatar" :style="{backgroundImage:'url(' + $avatar(memberResolve(item.member).avatar) + ')'}" :title="memberResolve(item.member).name"></i></span>
                        <div v-else class="form-group">
                            <select v-model="item.member">
                                <option v-for="m in member" :value="$index">{{m.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="cat">
                        <span v-if="!item.modify">{{catResolve(item.category)}}</span>
                        <div v-else class="form-group">
                            <select v-model="item.category">
                                <option v-for="c in cat" :value="$index">{{c}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="spend">
                        <span v-if="!item.modify">
                            <em class="title">{{item.spend | incomeTitleFormat}}了</em>
                            <em class="price">{{$encodeFen($abs(item.spend)) | currency '¥'}}</em>
                        </span>
                        <div v-else class="form-group">
                            <input type="text" v-model="item.spend" @keyup.enter="next">
                        </div>
                    </div>
                    <div class="note">
                        <span v-if="!item.modify">{{item.note}}</span>
                        <div v-else class="form-group">
                            <input type="text" v-model="item.note" @keyup.enter="save($index)" name="note">
                        </div>
                    </div>
                    <div class="control"><i class="fa fa-pencil" @click="update($index)" :class="{modify: item.modify}"></i><i class="fa" :class="{'fa-trash': !item.modify, 'fa-remove': item.modify}" @click="del($index)"></i></div>
                    <div v-if="item.modify" class="save"><btn @click="save($index)">保存</btn></div>
                </div>

            </div>
            <div class="item add">
                <div class="block">
                    <div class="new-title">新增</div>
                    <div class="member">
                        <div class="form-group">
                            <select v-model="newData.member">
                                <option v-for="m in member" :value="$index">{{m.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="cat">
                        <div class="form-group">
                            <select v-model="newData.category">
                                <option v-for="c in cat" :value="$index">{{c}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="spend">
                        <div class="form-group">
                            <input type="text" v-model="newData.spend" @keyup.enter="newNext">
                        </div>
                    </div>
                    <div class="note">
                        <div class="form-group">
                            <input type="text" v-model="newData.note" name="newNote" @keyup.enter="add">
                        </div>
                    </div>
                    <div class="save"><btn @click="add"><icon name="plus"></icon></btn></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import '../../assets/var';
    .page.detail {
        width: 100%;
        .list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 30px 0 30px 30px;
            .item {
                width: 100/6%;
                margin-bottom: 30px;
                padding-right: 30px;
                > .block {
                    width: 100%;
                    height: 250px;
                    border: 1px solid #dfdfdf;
                    border-radius: 4px;
                    .boxShadowForBlock;
                    word-break: break-all;
                    position: relative;
                    .member {
                        color: @linkColor;
                        font-size: 20px;
                        text-align: center;
                        padding: 40px 0 10px 0;
                        span:first-child {
                            display: flex;
                            width: 100%;
                            justify-content: center;
                            align-items: center;
                            .avatar {
                                display: block;
                                width: 64px;
                                height: 64px;
                                border-radius: 32px;
                                background: no-repeat center;
                                background-size: cover;
                                border: 2px solid cornsilk;
                                .boxShadowForBlock(.5);
                            }
                        }
                    }
                    .cat {
                        color: #999;
                        text-align: center;
                        padding-bottom: 10px;
                    }
                    .spend {
                        padding-bottom: 10px;
                        em {
                            display: block;
                            text-align: center;
                            font-style: normal;
                        }
                        .title {
                            padding-bottom: 20px;
                        }
                        .price {
                            color: crimson;
                            font-size: 28px;
                        }
                    }
                    .control {
                        position: absolute;
                        top: 0;
                        width: 100%;
                        left: 0;
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        > .fa {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 20px;
                            height: 20px;
                            color: #fff;
                            border-radius: 50%;
                            cursor: pointer;
                            font-size: 12px;
                            &.fa-trash {
                                background-color: #d4d4d6;
                            }
                            &.fa-remove {
                                background-color: #333;
                            }
                            &.fa-pencil {
                                background: #ffd7d7;
                                &.modify {
                                    background-color: crimson;
                                }
                            }
                        }
                    }
                    .note {
                        padding-bottom: 10px;
                        text-align: center;
                        color: #999;
                    }
                    .form-group {
                        padding: 0 10px;
                        input, select {
                            color: #666;
                        }
                    }
                    .save {
                        padding-bottom: 10px;
                        text-align: center;
                    }
                }
                &.add {
                    .new-title {
                        text-align: center;
                        padding: 10px 0 10px;
                    }
                    .member {
                        padding-top: 0;
                    }
                }
            }
        }
    }
</style>
<script type="text/babel">
    import icon from '../icon/';
    import btn from '../btn/';
    import outlay from 'data/outlay.json'
    import member from 'data/member.json'
    import cat from 'data/category.json'
    import fs from 'fs'

    export default {
        data () {
            let date = this.$route.params.date;
            return {
                list: (function (date) {
                    var arr = [];
                    outlay[date] && outlay[date].forEach((item, index)=>{
                        arr[index] = item;
                        arr[index].modify = false;
                    });
                    return arr;
                })(date),
                member,
                cat,
                cacheData: {},
                newData: {
                    member: 0,
                    category: 0,
                    spend: null,
                    note: '',
                    modify: false
                }
            }
        },
        components:{
            icon,
            btn
        },
        methods: {
            next(){
                this.$el.querySelector('[name="note"]').focus();
            },
            newNext(){
                this.$el.querySelector('[name="newNote"]').focus();
            },
            validate(data){
                if(isNaN(Number(data.spend)) || data.spend === null || data.spend === ''){
                    this.$dialog.show({
                        type: 'error',
                        buttons: ['确定'],
                        title: '错误',
                        message: '花费或者收入必须是一个数字.'
                    });
                    return false;
                }
                return true;
            },
            catResolve(index){
                return cat[index];
            },
            memberResolve(index){
                return member[index];
            },
            save(index){
                if(this.validate(this.list[index])){
                    if(this.list[index].modify){
                        this.list[index].modify = false;
                        this.saveData();
                    }
                }
            },
            saveData(){
                outlay[this.$route.params.date] = [];
                this.list.forEach((item, index) => {
                    outlay[this.$route.params.date][index] = {};
                    Object.keys(item).forEach((key)=>{
                        key !== 'modify' && (outlay[this.$route.params.date][index][key] = item[key]);
                    });
                });
                let ws = fs.createWriteStream(`${this.$Path.dataPath}/outlay.json`, 'utf8');
                ws.write(JSON.stringify(outlay, null, 2));
                ws.end();
            },
            add(){
                if(this.validate(this.newData)){
                    this.newData.spend = this.$decodeFen(this.newData.spend);
                    this.list.push(this.newData);
                    this.newData = {
                        member: 0,
                        category: 0,
                        spend: null,
                        note: '',
                        modify: false
                    };
                    this.saveData();
                }
            },
            update(index){
                if(!this.list[index].modify){
                    this.list[index].modify = true;
                    Object.keys(this.list[index]).forEach((key)=>{
                        this.cacheData[key] = this.list[index][key];
                    });
                }
            },
            del(index){
                if(this.list[index].modify){
                    Object.keys(this.cacheData).forEach((key)=>{
                        this.list[index][key] = this.cacheData[key];
                    });
                    this.list[index].modify = false;
                    this.cacheData = {};
                } else {
                    let result = this.$dialog.show({
                        type: 'question',
                        buttons: ['取消', '确定'],
                        title: '提示',
                        message: '确定要删除这条数据吗?'
                    });
                    result == 1 && this.list.splice(index, 1) && this.saveData();
                }
            }
        }

    }
</script>