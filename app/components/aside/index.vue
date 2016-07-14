<template>
    <div class="list">
        <div class="item" @click="$router.go(item.path)" v-for="item in routeList" :class="{active: item.model === modelName}" :title="item.name"><icon :name="item.icon"></icon></div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    @import '../../assets/var';
    .list {
        width: 80px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        flex-shrink: 0;
        background-color: @asideBg;
        box-shadow: 1px 0 5px rgba(0, 0, 0, 0.4);
        //margin-bottom: -@containerPb;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        z-index: 3;
        > .item {
            cursor: pointer;
            width: 100%;
            display: flex;
            color: #fff;
            height: 80px;
            align-items: center;
            justify-content: center;

            &:hover, &.active {
                background-color: lighten(@asideBg, 5%);
            }

            & + .item {
                margin-top: 20px;
            }

            .fa {
                font-size: 36px;
            }
        }
    }
</style>
<script type="text/babel">
    import {routerMap} from '../../router'
    import icon from '../icon/index'

    export default {
        data () {
            return {
                routeList: (function () {
                    let arr = [];
                    Object.keys(routerMap).forEach(function (key) {
                        let route = routerMap[key];
                        !(route.outOfNav) && arr.push({
                            path: key,
                            model: route.pageData.modelName,
                            name: route.pageData.pageTitle,
                            icon: route.pageData.icon
                        })
                    });
                    return arr;
                })()
            }
        },
        computed:{
            modelName(){
                return this.$route.pageData.modelName;
            }
        },
        components: {
            icon
        }
    }
</script>