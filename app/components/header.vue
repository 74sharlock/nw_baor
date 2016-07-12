<template>
    <header class="drag">
        <div class="handle no-drag">
            <span class="remove" @click="closeWin"><icon name="remove"></icon></span>
            <span class="minus" @click="minWin"><icon name="minus"></icon></span>
            <span class="plus" @click="maxWin"><icon name="plus"></icon></span>
        </div>

        <div v-if="$route.pageData.modelName === 'home'" class="no-drag dateDisplay">
            <btn-group>
                <btn>年</btn>
                <btn>月</btn>
                <!--todo: 必须删掉这个临时按钮-->
                <btn @click="s">s</btn>
            </btn-group>
        </div>
        <div class="backBtn no-drag" v-show="$route.pageData.needBack" @click="resolveBack"><btn>返回</btn></div>
        <div class="toggleBtn no-drag" v-show="$route.pageData.needMenu"><icon name="bars"></icon></div>
    </header>
</template>
<style lang="less" rel="stylesheet/less">
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

    export default {
        methods:{
            //todo: 必须删掉这个临时方法
            s(){
                this.$ipcRenderer.send('toggleDevTools');
            },
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
            }
        },
        components: {
            icon,
            btn,
            btnGroup
        }
    }
</script>