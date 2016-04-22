const timerObj = function (timeMap) {
  let date = timeMap ? new Date(timeMap) : new Date();
  return {
    "y": date.getFullYear(),
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
};

export default {
  getTimeStr(timeMap){
    let o = timerObj(timeMap);
    return `${o['h+']}:${o['m+']}:${o['s+']}`;
  },
  getDateStrWithTimeStamp(timeStamp){
    let o = timerObj(timeStamp);
    return `${o['y']}/${o['M+']}/${o['d+']}`;
  },
  getDateStr (offset){
    offset = offset || 0;
    let date = new Date();
    date.setDate(date.getDate() + offset);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }
};
