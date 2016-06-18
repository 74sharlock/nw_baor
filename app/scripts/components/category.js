import Category from '../data/category';
import dataModel from '../data/main';
import {traverse} from '../data/main';
import modal from './modal';

let Cat = new Category();
let db = new dataModel();
let allData = db.sourceData;
let allCats = Cat.sourceData;

let labelBgColor = ['label-default', 'label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger'];

let randomNum = function (num1, num2) {
  return Math.round(Math.abs(num1 - num2)*Math.random()+Math.min(num1, num2));
};

export default Vue.component('member', {
  data (){
    return {
      sourceCats: allCats,
      cats: (function () {
        var arr = [];
        allCats.forEach(function (item, index) {
          arr.push({
            name: item,
            bg: labelBgColor[randomNum(0, labelBgColor.length - 1)],
            count: (function () {
              let i = 0;
              for(let key in allData){
                if(allData.hasOwnProperty(key)){
                  let curData = allData[key];
                  curData.forEach(function (item) {
                    item.category == index && i ++;
                  });
                }
              }
              return i;
            })()
          });
        });
        return arr;
      })(),
      newCat: '',
      cacheName: '',
      curIndex:'',
      targetIndex: ''
    }
  },
  components:{
    modal
  },
  methods: {
    addCat (){
      this.cats.push({
        name: this.newCat,
        bg:labelBgColor[randomNum(0, labelBgColor.length - 1)],
        count: 0
      });
      Cat.addOne(this.newCat);
      this.newCat = '';
    },
    delCat (index){
      this.cats.splice(index, 1);
      Cat.delOne(index);
    },
    modify (index){
      this.cats[index].name = this.cacheName;
      Cat.update(index, this.cacheName);
      this.$refs['modify'].hideModal();
    },
    showModal (index){
      this.curIndex = index;
      this.$refs['transform'].showModal();
    },
    transform (index, targetIndex){
      let i = 0;
      db.save(traverse(allData, null, (e) => {
        if(e.item.category == index){
          e.item.category = targetIndex;
          i++;
        }
      }));
      this.cats[index].count = 0;
      this.cats[targetIndex].count = i;
      this.$refs['transform'].hideModal();
      this.targetIndex = '';
    },
    getModified(index){
      this.curIndex = index;
      this.cacheName = this.cats[index].name;
      this.$refs['modify'].showModal();
    }
  },
  template: `<div class="cat-block block clearfix no-drag">
    <h3 v-for="cat in cats" class="items">
      <span>{{ cat.name }}</span>
      <span class="label {{cat.bg}}">{{cat.count}}</span> 
      <i class="fa fa-remove pointer pull-right" @click="delCat($index)" v-if="cat.count===0"></i>
      <i class="fa fa-mail-forward pointer pull-right" @click="showModal($index)" v-if="cat.count>0"></i> 
      <i class="fa fa-pencil pointer pull-right" @click="getModified($index)"></i>
    </h3>
    <h3 class="add">
      <div class="input-group">
          <input type="text" v-model="newCat" class="form-control">
          <span class="pointer input-group-addon" @click="addCat"><i class="fa fa-plus"></i></span>
        </div>
    </h3>
    <modal v-ref:transform>
      <div class="modal-header no-drag" slot="header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
        <h4 class="modal-title">转移数据</h4>
      </div>
      <div class="modal-body no-drag" slot="body">
        <div class="form-group">
          <label>选择一个分类:</label>
          <select class="form-control" v-model="targetIndex">
            <option value="" v-for="cat in cats" :value="$index">{{ cat.name }}</option>
         </select>
        </div>
      </div>
      <div class="modal-footer" slot="footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="transform(curIndex, targetIndex)">Save changes</button>
      </div>
    </modal>
    <modal v-ref:modify>
      <div class="modal-header no-drag" slot="header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
        <h4 class="modal-title">修改分类</h4>
      </div>
      <div class="modal-body no-drag" slot="body">
        <input class="form-control no-drag" v-model="cacheName">
      </div>
      <div class="modal-footer" slot="footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="modify(curIndex)">Save changes</button>
      </div>
    </modal>
  </div>`
});
