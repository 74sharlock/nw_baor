const fs = nw.require('fs');

export default class {

  constructor (){
    this.dbPath = ``;
    this.sourceData = [];
  }

  /**查询所有数据**/
  queryAll (){
    return this.sourceData;
  }

  /**查询一条数据**/
  queryOne (index, data){
    return (data || this.sourceData)[index];
  }

  /**保存数据**/
  save (data) {
    data && (this.sourceData = data);
    return fs.writeFileSync(this.dbPath, JSON.stringify(this.sourceData, null, 2), 'utf8');
  };

  /**更新一条数据**/
  update (index, data){
    this.sourceData[index] = data;
    this.save();
    return {resultCode:200, index};
  }

  /**插入一条数据**/
  addOne (data){
    this.sourceData.push(data);
    this.save();
    return {resultCode:200, index: (this.sourceData.length - 1)};
  }

  /**批量插入数据**/
  add (dataArray){
    dataArray.forEach((item)=>{
      this.sourceData.push(item);
    });
    this.save();
    return {resultCode: 200};
  }

  /**删除一条数据**/
  delOne (index){
    this.sourceData.splice(index, 1);
    this.save();
    return {resultCode: 200};
  }
}
