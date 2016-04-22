import base from './base';
let memberData = nw.require(`${nw.__dirname}/data/member.json`);

export default class Member extends base {

  constructor (){
    super();
    this.dbPath = `${nw.__dirname}/data/member.json`;
    this.sourceData = memberData;
  }

}
