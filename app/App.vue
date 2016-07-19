<template>
    <div id="app">
        <common-header :show-menu.sync="showMenu"></common-header>
        <div class="container">
            <x-aside class="no-drag" v-show="showMenu" transition="expand"></x-aside>
            <router-view class="animated half" transition="fadeSlide" transition-mode="out-in" :class="{showMenu: showMenu}"></router-view>
        </div>
    </div>
</template>

<script>
    import xAside from 'components/aside'
    import CommonHeader from 'components/header'

    export default {
        data(){
            return {
                showMenu: true
            }
        },
        components: {
            xAside,
            CommonHeader
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import './node_modules/animate.css/animate.css';
    @import './node_modules/normalize.css/normalize.css';
    @import './node_modules/font-awesome/less/font-awesome.less';
    @import 'assets/var';
    @import 'assets/transition';

    html {
        font-size: 10px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        color: #4d494d;
    }

    html, body {
        height: 100%;
        background-color: #fff;
    }

    .no-drag {
        -webkit-app-region: no-drag;
    }

    .drag {
        -webkit-app-region: drag;
    }

    body {
        font-size: 1.4rem;
    }

    .form-group {

        input {
            width: 100%;
            background: none;
            border: 1px solid #ccc;
            padding: 5px 10px;
            font-size: 14px;
            border-radius: 4px;
            outline: none;
        }
        select {
            width: 100%;
            border: 1px solid #ccc;
            padding: 5px 15px 5px 10px;
            border-radius: 4px;
            margin: 0;
            -webkit-appearance:none;
            background: url("./assets/arrow.png") no-repeat scroll right center transparent;
            outline: none;
            font-size: 14px;
        }
    }

    input.form-control {
        &:extend(.form-group input);
    }

    select.form-control {
        &:extend(.form-group select);
    }

    #app {
        height: 100%;
        overflow: hidden;
        display: flex;
        width: 100%;
        flex-direction: column;
        * {
            box-sizing: border-box;
        }
        .container {
            display: flex;
            height: 100%;
            align-items: stretch;
            //padding-bottom: @containerPb;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .page {
            position: relative;
            z-index: 2;
            width: 100%;
        }
    }

    .animated.half {
        -webkit-animation-duration: .25s;
        animation-duration: .25s;
        &.and-half {
            -webkit-animation-duration: .25s;
            animation-duration: .25s;
        }
    }

    .sign.arrow {
        position: relative;
    }

    .sign.arrow::after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 1.5px 1.5px 0 0;
        border-color: currentColor;
        border-style: solid;
        position: absolute;
        transition: all .5s;
    }

    .sign.arrow.right::after {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        right: 15px;
        top: 50%;
        margin-top: -4px;
    }

    .sign.arrow.bottom::after {
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        right: 15px;
        top: 50%;
        margin-top: -6px;
    }

    .sign.arrow.top::after {
        -webkit-transform: rotate(315deg);
        transform: rotate(315deg);
        right: 15px;
        top: 50%;
        margin-top: -4px;
    }
    .sign.clock {
        display: block;
        position: relative;
        border-radius: 50%;
        color: #000;
        border: 1px solid currentColor;
        width: 18px;
        height: 18px;
        &::after {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 4px;
            border-width: 0 0 1.5px 1.5px;
            border-color: currentColor;
            border-style: solid;
            position: absolute;
            transition: all .5s;
        }
        &.three::after {
            left: ~'calc(50% - 1px)';
            top: 2px;
        }
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: rgba(0, 231, 255, .76);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(0, 231, 255, .4);
    }

    .ui.tips {
        display: inline-block;
        position: relative;
        &.underline {
            text-decoration: underline;
        }
        &.pointer {
            cursor: pointer;
        }
        &::before {
            display: none;
            position: absolute;
            content: '';
            height: 16px;
            width: 16px;
            border-width: 0 0 1px 1px;
            border-color: rgba(0, 0, 0, 0.1);
            border-style: solid;
            z-index: 2;
        }
        &::after {
            display: none;
            position: absolute;
            content: attr(data-title);
            justify-content: center;
            align-items: center;
            height: 2.6em;
            z-index: 3;
            border-radius: 4px;
            font-size: 14px;
            color: #fff;
        }

        &:hover {
            &::after {
                display: flex;
            }
            &::before {
                display: block;
            }
        }

        &.top {
            &::before {
                transform: rotate(45deg);
                left: 50%;
                margin-left: -8px;
                top: -24px;
            }
            &::after {
                left: -75%;
                width: 250%;
                top: ~'calc(-2.6em - 10px)';
            }
        }

        &.black {
            &::before, &::after {
                background-color: #333;
            }
        }
    }


</style>
