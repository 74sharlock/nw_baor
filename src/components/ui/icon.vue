<template>
    <i class="fa fa-{{name}} fa-{{size}}" :class="{spin: type === 'spin'}"></i>
</template>
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script type="text/babel">
    export default {
        props: ['name', 'type', 'size'],
        data () {
            return {
                
            }
        }
    }
</script>