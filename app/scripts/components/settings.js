const fs = nw.require('fs');

export default Vue.component('settings', {
  data (){
    return {};
  },
  methods: {
    exportData(event){
      let sourceData = {
        category: nw.require('../data/category.json'),
        data: nw.require('../data/data.json'),
        member: nw.require('../data/member.json')
      };
      if(event.target.value){
        fs.writeFileSync(`${event.target.value}/data.bak.json`, JSON.stringify(sourceData, null, 2));
        event.target.value = '';
      }
    },
    importData (event){
      if(event.target.value){
        let sourceData = nw.require(`${event.target.value}/data.bak.json`);
        fs.writeFileSync(`../data/category.json`, JSON.stringify(sourceData.category, null, 2));
        fs.writeFileSync(`../data/data.json`, JSON.stringify(sourceData.data, null, 2));
        fs.writeFileSync(`../data/member.json`, JSON.stringify(sourceData.member, null, 2));
        event.target.value = '';
      }
    }
  },
  template: `<div class="block settings-block">
  <a class="btn btn-primary" data-target="#saveInput"><i class="fa fa-download"></i> 导出数据</a>
  <a class="btn btn-primary" data-target="#importInput"><i class="fa fa-upload"></i> 导入数据</a>
  <input class="hidden" type="file" id="saveInput" v-on:change="exportData($event)" nwdirectory> 
  <input class="hidden" type="file" id="importInput" v-on:change="importData($event)"> 
</div>`
});
