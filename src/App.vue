<template>
    <div id="app">
        <common-header></common-header>
        <router-view class="animated half" transition="fadeSlide" transition-mode="out-in"></router-view>
        <common-footer></common-footer>
    </div>
</template>

<script>
    import animateCss from 'animate.css';
    import normalizeCss from 'normalize.css';
    import commonHeader from 'components/header';
    import commonFooter from 'components/footer';

    export default {
        components: {
            commonHeader,
            commonFooter
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../node_modules/font-awesome/less/font-awesome.less';
    @import 'assets/var';

    .animated.half {
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
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

    section {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: @headerHeight;
        &::-webkit-scrollbar {

        }
    }


</style>
