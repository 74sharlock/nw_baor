import com from './common';
import Member from './data/member';
import Category from './data/category';

export default function () {
  Vue.filter('dateBeauty', function (value) {
    let today = Date.parse(com.getDateStr()), yesterday = Date.parse(com.getDateStr(-1)), theDayBeforeYesterday = Date.parse(com.getDateStr(-2)), parseVal = Date.parse(value);
    switch (true) {
      case (parseVal === yesterday):
        value = '昨天';
        break;
      case (parseVal === theDayBeforeYesterday):
            value = ' 前天';
            break;
      case (parseVal === today):
            value = '今天';
            break;
    }
    return value;
  });
  Vue.filter('MemberName', function (value) {
    return new Member().sourceData[value].name;
  });
  Vue.filter('catName', function (value) {
    return new Category().sourceData[value];
  });
  Vue.filter('queryDayType', function (value) {
    switch (value){
      case 'oneDay':
        value = '某天';
            break;
      case 'someDays':
        value = '一段时间';
            break;
    }
    return value;
  });
}
