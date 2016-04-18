import categoryData from './category';
import memberData from  './member';

/**
 *内部数据遍历方法
 *
 * @private
 * @param: {object or array} 用于遍历的数据对象
 * @param: {object or array or !!1} 期望返回的数据, 如果传递一个不等于true的值, 则返回原始数据
 * @param: {function(config)} 对数据进行处理的方法, 参数config是一个object:
 * {item: 遍历的当前数据, index: 遍历的当前索引, key: 当前的上级索引, curData:当前的上级数据, expection: 期望的数据, data: 原始数据}
 *
 */
let traverse = function (data, expection, handle) {
  for(let key in data){
    if(data.hasOwnProperty(key)){
      let curData = data[key];
      curData.forEach(function (item, index) {
        isFunction(handle) && handle({item, index, key, curData, expection, data});
      });
    }
  }
  return expection || data;
};

export default class {
  constructor(){
    this.dbPath = `${nw.__dirname}/data/data.json`;
    this.sourceData = traverse(nw.require(this.dbPath), null, function (config) {
      config.item.cat = categoryData[config.item['category']];
      config.item.person = (function () {
        let person;
        for (let i in memberData){
          if(memberData.hasOwnProperty(i)){
            if(config.item['who'] == memberData[i].id){
              return person = memberData[i].name;
            }
          }
        }
        return person;
      })();
    });
  }

  /**查询所有数据**/
  queryAll () {
    return this.sourceData;
  };

  /**查询某天的数据(允许基于某人的一段数据来查询)**/
  queryOneDay (date, data){
    return (data || this.sourceData)[date];
  };

  /**查询某人的全部数据(允许基于某段时间的一段数据来查询)**/
  querySomeone (who, data){
    return traverse((data || this.sourceData), {}, function (config) {
      if(config.item['who'] === who) {
        !config.expection[ config.key ] && (config.expection[ config.key ] = []);
        config.expection[ config.key ].push(config.item);
      }
    });
  };

  /**查询某些天数的数据(允许基于某人的一段数据来查询)**/
  querySomeDays (startDate, endDate, data) {
    return traverse((data || this.sourceData), {}, function (config) {
      let curTimestamp = Date.parse(config.key), startTimestamp = Date.parse(startDate), endTimestamp = Date.parse(endDate);
      if(endTimestamp >= curTimestamp &&  curTimestamp >= startTimestamp) {
        config.expection[config.key] = config.curData;
      }
    });
  };

  /**查询某些分类的数据(允许基于一段数据来查询)**/
  querySomeCat (catIds, data) {
    return traverse((data || this.sourceData), {}, function (config) {
      if(catIds.indexOf(config.item['category']) > -1) {
        !config.expection[ config.key ] && (config.expection[ config.key ] = []);
        config.expection[ config.key ].push(config.item);
      }
    });
  };

  /**保存数据**/
  save (data) {
    data && (this.sourceData = data);
    return fs.writeFileSync(dbPath, JSON.stringify(this.sourceData), 'utf8');
  };

  /**写入一条消费数据**/
  add (date, data) {
    !this.sourceData[date] && (this.sourceData[date] = []);
    this.sourceData[date].push(data);
    this.save();
    return {resultCode: 200, date};
  };

  /**更新一条消费数据**/
  update (date, data, index) {
    this.sourceData[date][index] = data;
    this.save();
    return {resultCode: 200, date};
  };

  /**删除一条消费数据**/
  delOne (date, index) {
    var ele = this.sourceData[date].splice(index, 1);
    this.save();
    return {resultCode: 200, ele}
  };

  /**删除一天的消费数据**/
  delOneDay (date) {
    delete this.sourceData[date];
    this.save();
    return {resultCode: 200}
  };
};
