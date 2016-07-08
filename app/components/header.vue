<template>
    <header class="drag">
        <div class="handle no-drag">
            <span class="remove"><icon name="remove"></icon></span>
            <span class="minus"><icon name="minus"></icon></span>
            <span class="plus"><icon name="plus"></icon></span>
        </div>

        <div v-if="$route.pageData.modelName === 'home'" class="no-drag dateDisplay">
            <btn-group>
                <btn>年</btn>
                <btn>月</btn>
            </btn-group>
        </div>

        <div class="toggleBtn no-drag"><icon name="bars"></icon></div>
    </header>
</template>
<style lang="less" rel="stylesheet/less">
    header {
        width: 100%;
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
        data () {
            return {
                
            }
        },
        components: {
            icon,
            btn,
            btnGroup
        }
    }
</script>