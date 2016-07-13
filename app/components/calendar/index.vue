<template>
    <div class="calendar">
        <slot name="header">
            <div class="header">
                <div class="month">{{dater.year}}年{{dater.month}}月<span v-if="dataMonthHandler()">{{{dataMonthHandler(firstDayOfMonth, LastDayOfMonth)}}}</span></div>
                <div class="handle">
                    <btn @click="showCalendar(handleMonth('prev', n(dater.year), n(dater.month)))"><</btn>
                    <btn @click="showCalendar(today)">今天</btn>
                    <btn @click="showCalendar(handleMonth('next', n(dater.year), n(dater.month)))">></btn>
                </div>
            </div>
        </slot>
        <div class="days">
            <div class="item" v-for="item in days">周{{item}}</div>
        </div>
        <div class="dates">
            <div class="item {{item.state}} {{item.name}}" v-for="item in dater.getMonthPanel()" track-by="$index" data-value="{{item.value}}" @click="$dispatch('item-click', item.value)">
                <div class="body">
                    <div class="date">{{item.day}}日</div>
                    <div class="data-item" v-if="dataHandler(item.value)">{{dataHandler(item.value)}}</div>
                    <component :is="itemComponent" :date="item"></component>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .calendar {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .month {
                font-size: 32px;
                padding: 20px;
            }
            .handle {
                display: flex;
                justify-content: space-around;
                padding-right: 20px;
                .btn + .btn {
                    margin-left: 5px;
                }
            }
        }
        .days {
            width: 100%;
            display: flex;
            justify-content: space-around;
            font-size: 16px;
            .item {
                flex-grow: 1;
                display: flex;
                justify-content: flex-end;
                padding: 15px;
            }
        }
        .dates {
            width: 100%;
            flex-wrap: wrap;
            display: flex;
            height: 100%;
            .item {
                display: flex;
                width: 100%/7;
                cursor: pointer;
                padding: 0 10px;
                color: #666;

                &.prevMonth, &.nextMonth {
                    color: #ccc;
                }

                .body {
                    border-top: 2px solid #eee;
                    width: 100%;
                    align-self: stretch;
                    overflow-x: hidden;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;

                    .date {
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                        padding: 5px 5px;
                    }
                }
                &.today > .body {
                    border-top-color: #2db7f5;
                    background-color: #eaf8fe;
                }

                &:hover > .body {
                    background-color: #eaf8fe;
                }
            }
        }
    }

</style>
<script type="text/babel">
    import btn from 'components/btn'
    import Calendar from './calendar';

    let calendar = new Calendar(Date.now());

    let noop = function () {};

    export default {
        props:{
            data: {},
            dataHandler: {
                type: Function,
                default: noop
            },
            dataMonthHandler: {
                type: Function,
                default: noop
            },
            itemComponent: {}
        },
        data () {
            return {
                today: Date.now(),
                dateTime: Date.now(),
                days: ['一', '二', '三', '四', '五', '六', '日']
            }
        },
        methods:{
            n(e){
                let result = parseInt(e, 10);
                return isNaN(result) ? e : result;
            },
            showCalendar(date){
                this.dateTime = new Date(date).getTime();
            },
            handleMonth(d, y, m){
                return ({
                    prev(){
                        return m === 1 ? `${y-1}/12/2` : `${y}/${m-1}/2`;
                    },
                    next(){
                        return m === 12 ? `${y+1}/1/2` : `${y}/${m+1}/2`;
                    }
                })[d]();
            }
        },
        computed: {
            dater(){
                return calendar.setTime(this.dateTime);
            },
            firstDayOfMonth(){
                return new Date(`${this.dater.year}/${this.dater.month}/01`).getTime();
            },
            LastDayOfMonth(){
                return new Date(`${this.dater.year}/${this.dater.month}/${this.dater.days}`).getTime();
            }
        },
        components: {
            btn
        }
    }
</script>