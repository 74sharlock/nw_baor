<template>
    <div class="btn-group"><slot></slot></div>
</template>
<style lang="less" rel="stylesheet/less">
    .btn-group {
        display: flex;
        .btn:first-child {
            border-radius: 4px 0 0 4px;
            border-right: none;
        }
        .btn:last-child {
            border-radius: 0 4px 4px 0;
            &:not(:nth-child(2)){
                border-left: none;
            }
        }
        .btn:not(:last-child):not(:first-child) {
            border-radius: 0;
            + .btn {
                border-left: none;
            }
        }
    }
</style>
<script type="text/babel">
    export default {}
</script>