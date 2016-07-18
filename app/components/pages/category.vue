<template>
    <div class="page cat">
        <div class="list">
            <div class="item" :class="{hasData: count($index) && !(cat.modify)}" v-for="cat in cats">
                <span :data-count="count($index)" :class="{modify: cat.modify}">
                    <i class="fa fa-pencil" @click="update($index)" v-show="!(cat.modify)"></i>
                    <em v-show="!(cat.modify)">{{cat.name}}</em>
                    <i class="fa fa-remove" @click="del($index)" v-if="!count($index)" v-show="!(cat.modify)"></i>
                    <input class="form-control" v-model="cat.name" v-show="cat.modify" @keyup.enter="save($index)">
                    <i class="fa fa-check" @click="save($index)" v-show="cat.modify"></i>
                </span>
            </div>
            <div class="item add">
                <span>
                    <input type="text" class="form-control" v-model="newCat" placeholder="添加新类别" @keyup.enter="add(newCat)">
                    <i class="fa fa-plus" @click="add(newCat)"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import '../../assets/var';
    .page.cat {
        width: 100%;
        .list {
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            justify-content: space-between;
            padding: 10px 0 0 10px;
            width: 100%;
            .item {
                width: 12.5%;
                padding: 0 10px 10px 0;
                span {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 50px;
                    border-radius: 4px;
                    border: 1px solid #dfdfdf;
                    .boxShadowForBlock();
                    font-size: 18px;
                    position: relative;
                    .fa-remove, .fa-pencil {
                        opacity: 0;
                        position: absolute;
                        font-size: 16px;
                        margin-top: -8px;
                        top: 50%;
                        transition: opacity .15s;
                        cursor: pointer;
                    }
                    .fa-remove {
                        right: 10px;
                    }
                    .fa-pencil {
                        left: 10px;
                    }
                    &:hover .fa-remove, &:hover .fa-pencil {
                        opacity: 1;
                    }
                    input {
                        width: 7em;
                        margin-right: 5px;
                        font-size: 14px;
                    }
                    .fa-plus, .fa-check {
                        cursor: pointer;
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    &.modify {
                        padding: 0 5px;
                    }
                    em {
                        font-style: normal;
                    }
                }
                &.hasData span::after {
                    display: flex;
                    background-color: lightcoral;
                    content: attr(data-count);
                    color: white;
                    justify-content: center;
                    align-items: center;
                    height: 18px;
                    padding: 0 10px;
                    border-radius: 50%;
                    margin-left: .3em;
                    font-size: 14px;
                }
                &.add span {
                    padding: 0 5px;
                }
            }
        }
    }
</style>
<script type="text/babel">
    import cats from 'data/category.json';
    import outlay from 'data/outlay.json';
    import fs from 'fs';

    export default {
        data () {
            return {
                cats: (function () {
                    let arr = [];
                    cats.forEach((cat)=>{
                        arr.push({
                            name: cat,
                            modify: false
                        });
                    });
                    return arr;
                })(),
                newCat: ''
            }
        },
        methods: {
            count(index){
                let count = 0;
                Object.keys(outlay).forEach((key)=>{
                    outlay[key].forEach((item)=>{
                        item.category === index && count ++;
                    });
                });
                return count;
            },
            required(string){
                if(string.trim() === ''){
                    this.$dialog.show({
                        type: 'error',
                        buttons: ['确定'],
                        title: '错误',
                        message: '分类为空可不行.'
                    });
                    return false;
                }
                return true;
            },
            update(index){
                if(!this.cats[index].modify){
                    this.cats[index].modify = true;
                }
            },
            add(cat){
                if(this.required(cat)){
                    this.cats.push({
                        name: cat,
                        modify: false
                    });
                    this.writeData();
                }
            },
            del(index){
                let result = this.$dialog.show({
                    type: 'question',
                    buttons: ['取消', '确定'],
                    title: '提示',
                    message: '确定要删除这个类别吗?'
                });
                result == 1 && this.cats.splice(index, 1) && this.writeData();
            },
            save(index){
                if(this.required(this.cats[index].name)){
                    this.cats[index].modify = false;
                    this.writeData();
                }
            },
            writeData(){
                let arr = [];
                this.cats.forEach(function (cat) {
                    arr.push(cat.name);
                });
                let ws = fs.createWriteStream(`${this.$Path.dataPath}/category.json`, 'utf8');
                ws.write(JSON.stringify(arr, null, 2));
                ws.end();
            }
        },
        components: {}
    }
</script>