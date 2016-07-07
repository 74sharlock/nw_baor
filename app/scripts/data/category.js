import base from './base';

let categoryData = nw.require(`${nw.__dirname}/data/category.json`);

export default class Category extends base {

  constructor (){
    super();
    this.dbPath = `${nw.__dirname}/data/category.json`;
    this.sourceData = categoryData;
  }

}
