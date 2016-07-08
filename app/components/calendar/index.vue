<template>
    <div class="calendar">
        <slot name="header">
            <div class="header">
                <div class="month">{{dater.year}}年{{dater.month}}月</div>
                <div class="handle"></div>
            </div>
        </slot>
        <div class="days">
            <div class="item" v-for="item in days">周{{item}}</div>
        </div>
        <div class="dates">
            <div class="item {{item.state}} {{item.name}}" v-for="item in monthPanel" track-by="$index" data-value="{{item.value}}">
                <div class="body">
                    <div class="date">{{item.day}}日</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
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
    import GregorianCalendar from 'gregorian-calendar';
    import calendarZh_CN from 'gregorian-calendar/lib/locale/zh_CN';

    import Calendar from './calendar';

    export default {
        data () {
            return {
                dateTime: Date.now(),
                days: ['一', '二', '三', '四', '五', '六', '日']
            }
        },
        computed: {
            dater (){
                return new Calendar(this.dateTime);
            },
            monthPanel(){
                return this.dater.getMonthPanel();
            }
        },
        components: {}
    }
</script>