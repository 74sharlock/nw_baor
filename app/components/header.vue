<template>
    <header class="drag">
        <div class="handle no-drag">
            <span class="remove" @click="closeWin"><icon name="remove"></icon></span>
            <span class="minus" @click="minWin"><icon name="minus"></icon></span>
            <span class="plus" @click="maxWin"><icon name="plus"></icon></span>
        </div>

        <div v-if="showBtn" class="no-drag dateDisplay">
            <btn-group>
                <btn>年</btn>
                <btn>月</btn>
            </btn-group>
        </div>
        <div v-if="showTitle" class="titleDisplay">
            {{dateFormat(n($route.params.date), 'yyyy年mm月dd日')}}
        </div>
        <!--<div class="backBtn no-drag" v-show="$route.pageData.needBack" @click="resolveBack"><btn>返回</btn></div>-->
        <div class="toggleBtn no-drag" :class="{active: showMenu}" @click="showMenu = !showMenu">
            <icon name="bars"></icon>
        </div>
    </header>
</template>
<style lang="less" rel="stylesheet/less">
    @import '../assets/var';
    header {
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background: linear-gradient(top, #ebebeb, #d5d5d5);
        .toggleBtn {
            font-size: 24px;
            cursor: pointer;
            padding: 2px 5px;
            transition: box-shadow .15s, background-color .15s;
            background-color: rgba(255, 255, 255, 0);
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0) inset;
            border-radius: 4px;
            color: #4d494d;
            &.active {
                color: #fff;
                background-color: @asideBg;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, .5) inset;
            }
        }
        .titleDisplay {
            font-size: 20px;
        }
        .handle {
            display: flex;
            span {
                width: 17px;
                height: 17px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                border-radius: 50%;
                cursor: pointer;
                &.plus {
                    background-color: #00ca56;
                    border: 1px solid #14ae46;
                    color: #006519;
                }
                &.minus {
                    background-color: #ffbd4c;
                    border: 1px solid #e09e3e;
                    color: #9a5518;
                }
                &.remove {
                    background-color: #ff5c5c;
                    border: 1px solid #e33e41;
                    color: #820005;
                }
                & + span {
                    margin-left: 15px;
                }
                .fa {
                    font-size: 12px;
                    opacity: 0;
                    transition: opacity .25s;
                }
            }
            &:hover {
                .fa {
                    opacity: 1;
                }
            }
        }
    }
</style>
<script type="text/babel">
    import icon from 'components/icon'
    import btn from 'components/btn'
    import btnGroup from 'components/btn-group'
    import dateFormat from 'dateformat'

    export default {
        props:{
            showMenu: {
                type:Boolean,
                twoWay: true,
                default: false
            }
        },
        computed:{
            showBtn(){
                return this.$route.pageData.modelName === 'home' && this.$route.path.indexOf('/detail') < 0;
            },
            showTitle(){
                return this.$route.pageData.modelName === 'home' && this.$route.path.indexOf('/detail') === 0;
            }
        },
        methods:{
            closeWin(){
                this.$ipcRenderer.send('close');
            },
            minWin(){
                this.$ipcRenderer.send('minimize');
            },
            maxWin(){
                this.$ipcRenderer.send('maximize');
            },
            resolveBack(){
                this.$router.replace(this.$route.pageData.backTo || '/');
            },
            dateFormat,
            n(a){
                return Number(a);
            }
        },
        components: {
            icon,
            btn,
            btnGroup
        },
        ready(){
            console.log(this.$route.path);
        }
    }
</script>