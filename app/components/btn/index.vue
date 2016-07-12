<template>
    <a class="btn {{type}}"><slot></slot></a>
</template>
<style lang="less" rel="stylesheet/less">
    .btn {
        display: inline-block;
        background-color: #fff;
        border-radius: 4px;
        padding: 3px 12px;
        border: 1px solid #ccc;
        cursor: pointer;
    }
</style>
<script type="text/babel">
    export default {
        props:{
            type: {
                type: String,
                default: ''
            }
        },
        components: {}
    }
</script>