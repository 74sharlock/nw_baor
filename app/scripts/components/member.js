import Member from '../data/member';

let MB = new Member();
let sourceData = MB.queryAll();

export default Vue.component('member', {
  data (){
    return {
      allMembers: sourceData,
      modifies: (function () {
        let data = [];
        for(let key in sourceData){
          if(sourceData.hasOwnProperty(key)){
            data.push({willModify: false});
          }
        }
        return data;
      })(),
      cacheData: {
        avatar: null,
        name: null
      },
      newData: {
        avatar: null,
        name: null
      }
    }
  },
  methods: {
    willModify (index){
      for(let key in this.allMembers[index]){
        if(this.allMembers[index].hasOwnProperty(key)){
          this.cacheData[key] = this.allMembers[index][key];
        }
      }
      this.modifies[index].willModify = true;
    },
    addMember (){
      if(this.newData.name !== '' && this.newData.name !== undefined){
        this.allMembers.push({
          name: this.newData.name,
          avatar: this.newData.avatar
        });
        this.modifies.push({willModify: false});
        this.newData.name = null;
        this.newData.avatar = null;
        MB.save();
      }
    },
    modifyMember (index){
      for(let key in this.cacheData){
        if(this.cacheData.hasOwnProperty(key)){
          this.allMembers[index][key] = this.cacheData[key];
        }
      }
      this.modifies[index].willModify = false;
      MB.save();
    }
  },
  template: `<div class="member-block block">
    <div>
      <div class="card text-center" v-for="man in allMembers">
        <img class="card-img-top" :src="man.avatar || '/dist/images/avatar.png'" alt="Card image cap">
        <div class="card-footer text-muted text-center">
          <div class="form-group">
            <div v-show="!modifies[$index]['willModify']">{{man.name}}</div>
            <div class="input-group" v-show="modifies[$index]['willModify']">
              <input type="text" v-model="cacheData.name" class="form-control">
              <div class="input-group-addon pointer" @click="modifyMember($index)">save</div>
            </div>
          </div>
        </div>
        <div class="tools clearfix">
          <i class="fa fa-pencil pull-left" @click="willModify($index)"></i>
        </div>
      </div>
      <div class="card text-center">
        <div class="card-block">
          <h4 class="card-title">新增</h4>
          <div class="card-text">
            <div class="form-group">
              <input type="text" v-model="newData.name" class="form-control">
            </div>
            <div class="form-group">
              <a class="btn btn-success" @click="addMember"><i class="fa fa-github"></i> 添加一个宝宝</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
});
