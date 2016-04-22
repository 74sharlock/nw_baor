import dataModel from '../data/main';
import Member from '../data/member';
import Category from '../data/category';
import com from '../common';
import modal from './modal';
import datePicker from './datePicker';

const getDateStr = com.getDateStr;
let db = new dataModel();
let sourData = db.querySomeDays(getDateStr(-2), getDateStr());
let mb = new Member();
let cat = new Category();

let fixedTotalInHand = function (key, num) {
  Q('[data-date="' + key + '"]').Q('.price b').innerHTML = (num / 100).toFixed(2);
};

export default Vue.component('index', {
  data () {
    return {
      items: (function () {
        let data = sourData;
        for( var key in data){
          if(data.hasOwnProperty(key)){
            data[key].total = 0;
            data[key].forEach( (item) => {
              data[key].total += item['spend'];
            });
          }
        }
        return data;
      })(),
      members: mb.queryAll(),
      cats: cat.queryAll(),
      newData: (function () {
        let data = sourData, json = {};
        for (let key in data){
          if(data.hasOwnProperty(key)){
            json[key] = {
              "category": null,
              "spend": null,
              "who": null,
              "note": null
            }
          }
        }
        return json;
      })(),
      cacheData: {
        "category": null,
        "spend": null,
        "who": null,
        "note": null
      },
      curIndex: null,
      curKey: null,
      queryType: 'oneDay',
      queryDate: getDateStr(),
      queryStart: '',
      queryEnd: ''
    }
  },
  computed: {

  },
  components: {
    modal,
    datePicker
  },
  methods: {
    showModal (name, key, index){
      if(!this.items[key]) return;
      let curData = this.items[key][index];
      this.cacheData = {
        "category": curData.category,
        "spend": curData.spend / 100,
        "who": curData.who,
        "note": curData.note
      };
      this.curKey = key;
      this.curIndex = index;
      this.$refs[name].showModal();
    },
    hideModal (name){
      this.$refs[name].hideModal();
    },
    add (date) {
      let allFilled = true;
      this.newData[date]['time'] = com.getTimeStr(Date.now());
      for(let key in this.newData[date]){
        if(this.newData[date].hasOwnProperty(key)){
          let curItem = this.newData[date][key];
          if(curItem === null || curItem === ''){
            allFilled = false;
            break;
          }
        }
      }
      if(allFilled){
        this.newData[date].spend *= 100;
        this.items[date].push(this.newData[date]);
        !this.items[date].total && (this.items[date].total = 0, this.items[date].total += this.newData[date].spend);
        fixedTotalInHand(date, this.items[date].total);
        db.save();
        this.newData[date] = {
          "category": null,
          "spend": null,
          "who": null,
          "note": null
        };
      }
    },
    del (key, index) {
      this.items[key].total -= this.items[key][index]['spend'];
      this.items[key].splice(index, 1);
      fixedTotalInHand(key, this.items[key].total);
      db.save();
    },
    update (key, index){
      this.items[key].total -= this.items[key][index]["spend"];
      for(let k in this.cacheData){
        if(this.cacheData.hasOwnProperty(k)){
          this.items[key][index][k] = this.cacheData[k];
        }
      }
      this.items[key][index]["spend"] = this.cacheData.spend * 100;

      this.items[key].total += this.items[key][index]["spend"];

      db.save();
      fixedTotalInHand(key, this.items[key].total);
      this.$refs['modify'].hideModal();
    },
    datePick(a, b){
      var d1 = Date.parse(a.$key), d2 = Date.parse(b.$key);
      return d1 - d2;
    },
    queryOneDay () {
      this.items = {
        [this.queryDate] : db.queryOneDay(this.queryDate)
      };
      (!this.items[this.queryDate].total && this.items[this.queryDate].length === 0) && (this.items[this.queryDate].total = 0);
    },
    querySomeDays () {
      this.items = db.querySomeDays(this.queryStart, this.queryEnd);
      for(let key in this.items){
        if(this.items.hasOwnProperty(key)){
          (!this.items[key].total && this.items[key].length === 0) && (this.items[key].total = 0);
        }
      }
    }
  },
  template: `<div class="block">
    <div class="form-inline block-leader">
      <div class="form-group block-way-selector">
        <div class="btn-group">
          <button type="button" class="btn btn-danger">{{ queryType | queryDayType }}</button>
          <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" @click="queryType='oneDay'">某天</a>
            <a class="dropdown-item" @click="queryType='someDays'">一段时间</a>
            <!--<a class="dropdown-item" href="#">Something else here</a>-->
            <!--<div class="dropdown-divider"></div>-->
            <!--<a class="dropdown-item" href="#">Separated link</a>-->
          </div>
        </div>
      </div>
      <div class="form-group" v-show="queryType==='oneDay'">
        <label>某天:</label>
        <date-picker :model.sync="queryDate"></date-picker>
      </div>
      <div class="form-group" v-show="queryType==='oneDay'">
        <a class="btn btn-primary" @click="queryOneDay">查询</a>
      </div>
      <div class="form-group" v-show="queryType==='someDays'">
        <label>开始时间:</label>
        <date-picker :model.sync="queryStart"></date-picker>
      </div>
      <div class="form-group" v-show="queryType==='someDays'">
        <label>结束时间:</label>
        <date-picker :model.sync="queryEnd"></date-picker>
      </div>
      <div class="form-group" v-show="queryType==='someDays'">
        <a class="btn btn-primary" @click="querySomeDays">查询</a>
      </div>
    </div>
    <div v-for="item in items | orderBy datePick -1" class="no-drag" data-date="{{$key}}">
      <h4 class="card-title">{{ $key | dateBeauty }} (<span class="price text-danger-2"><b> {{ item.total / 100 | currency '' }} </b></span>) </h4>
      <div class="">
        <div class="card text-center card-black" v-for="data in item">
          <blockquote class="card-block">
            <h4 class="card-title">{{ data.who | memberName }}</h4>
            <p class="card-text">花费了</p>
            <p class="card-text price text-danger-2"><b>{{ data.spend / 100 | currency ''}}</b></p>
            <p>用于<a class="card-link">{{ data.category | catName }}</a></p>
            <footer class="text-muted text-right">
              <small>
                {{ data.time }}
              </small>
            </footer>
          </blockquote>
          <div class="card-footer text-muted text-center" v-if="data.note">{{ data.note }}</div>
          <div class="tools clearfix">
            <i class="fa fa-pencil pull-left" @click="showModal('modify', $parent.$key, $index)"></i>
            <i class="fa fa-remove pull-right" @click="del($parent.$key, $index)"></i>
          </div>
        </div>
        <div class="card text-center card-black">
          <div class="card-block">
            <h4 class="card-title">新增</h4>
            <div class="card-text">
              <div class="form-group">
                <select class="form-control" v-model="newData[$key].who">
                  <option v-for="man in members" :value="$index">{{ man.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <select class="form-control" v-model="newData[$key].category">
                  <option value="" v-for="cat in cats" :value="$index">{{ cat }}</option>
                </select>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">¥</div>
                  <input type="number" class="form-control" v-model="newData[$key].spend" placeholder="Amount">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">R</div>
                  <input type="text" class="form-control" v-model="newData[$key].note" maxlength="10" 
                  placeholder="Note">
                </div>
              </div>
              <div class="form-group">
                <a class="btn btn-success" @click="add($key)"><i class="fa fa-plus"></i> 添加这条消费记录</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <modal v-ref:modify>
      <div class="modal-header" slot="header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
        <h4 class="modal-title">修改</h4>
      </div>
      <div class="modal-body" slot="body">
        <div class="form-group">
          <select class="form-control" v-model="cacheData.who">
            <option v-for="man in members" :value="$index">{{ man.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <select class="form-control" v-model="cacheData.category">
            <option value="" v-for="cat in cats" :value="$index">{{ cat }}</option>
         </select>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">¥</div>
            <input type="number" class="form-control" v-model="cacheData.spend" placeholder="Amount">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
           <div class="input-group-addon">R</div>
            <input type="text" class="form-control" v-model="cacheData.note" maxlength="10" 
            placeholder="Note">
          </div>
        </div>
      </div>
      <div class="modal-footer" slot="footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="update(curKey, curIndex)">Save changes</button>
      </div>
    </modal>
  </div>`
});
