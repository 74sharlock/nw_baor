<template>
    <div class="page">
        <calendar :item-component="$options.components.todayOutlay" :month-component="$options.components.monthOutlay" @item-click="go"></calendar>
    </div>
</template>
<script type="text/babel">
    import calendar from '../calendar/'
    import todayOutlay from '../today-outlay'
    import monthOutlay from '../month-outlay'

    export default {
        data () {
            return {
            }
        },
        methods:{
            go(date){
                this.$router.go(`/detail/${new Date(date).getTime()}`);
            }
        },
        components: {
            calendar,
            todayOutlay,
            monthOutlay
        }
    }
</script>