import util from 'util';

const zeroFormat = day => day < 10 ? `0${day}` : `${day}`;

export default class Calendar {
    constructor(dateTime){
        this.setTime(dateTime);
    }

    setTime(dateTime){
        this.dateTime = dateTime;
        this.dater = util.isNullOrUndefined(this.dateTime) ? new Date() : new Date(dateTime);
        this.day = zeroFormat(this.dater.getDay());
        this.month = `${this.dater.getMonth() + 1}`;
        this.year = `${this.dater.getFullYear()}`;
        this.date = `${this.dater.getDate()}`;
        this.isLeap = (this.dater.getFullYear() % 100 === 0 ? (this.dater.getFullYear() % 400 === 0 ? 1 : 0) : ( this.dater.getFullYear() % 4 === 0 ? 1 : 0));
        this.monthDays = [31, (28 + this.isLeap), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.days = this.monthDays[this.dater.getMonth()];
        return this;
    }

    getMonthPanel(){
        let days = this.monthDays[this.dater.getMonth()],
            dayOfTheFirst = new Date(`${this.year}/${this.month}/1`).getDay(), //每月第一天是星期几
            i = 1,
            l = dayOfTheFirst === 1 ? 7 : dayOfTheFirst - 1,
            prevMonth = this.dater.getMonth() === 0 ? 11 : this.dater.getMonth() - 1,
            prevYear = this.dater.getMonth() === 0 ? Number(this.year) - 1 : this.year,
            nextYear = this.dater.getMonth() === 11 ? Number(this.year) + 1 : this.year,
            prevDay = this.monthDays[prevMonth],
            arr = [];


        while(arr.length < 42){
            if(l){
                l--;
                arr.unshift({state:'prevMonth', day: zeroFormat(prevDay), value: `${prevYear}/${zeroFormat(prevMonth + 1)}/${zeroFormat(prevDay)}`, name: ''});
                console.log(prevDay, zeroFormat(prevDay));
                prevDay --;
            } else {
                arr.push(i > days ? {
                    state:'nextMonth',
                    day: zeroFormat((i - days)),
                    value: `${nextYear}/${zeroFormat(Number(this.month) === 12 ? 1 : Number(this.month) + 1)}/${zeroFormat((i - days))}`,
                    name: ''} : {
                    state:'thisMonth',
                    day: zeroFormat(i),
                    value: `${this.year}/${zeroFormat(this.month)}/${zeroFormat(i)}`,
                    name: (function () {
                        let name = '';
                        if(this.year == new Date().getFullYear() && this.month == new Date().getMonth() + 1){
                            switch (true){
                                case (i === new Date().getDate()):
                                    name = 'today';
                                    break;
                                case (i === new Date().getDate()- 1):
                                    name = 'yesterday';
                                    break;
                                case (i === new Date().getDate() + 1):
                                    name = 'tomorrow';
                                    break;
                            }
                        }

                        return name;
                    }).call(this)
                });
                i ++;
            }

        }

        return arr;
    }
}