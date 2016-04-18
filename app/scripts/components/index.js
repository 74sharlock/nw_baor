import dataModel from '../data/main';

export default Vue.component('index', {
  data () {
    return {
      items: (function () {
        let db = new dataModel();
        let data = db.queryAll();
        for( var key in data){
          if(data.hasOwnProperty(key)){
            data[key].total = 0;
            data[key].forEach((item)=>{
              data[key].total += item['spend']
            });
          }
        }
        return data;
      })()
    }
  },
  template: `<div v-for="item in items" class="no-drag">
    <h4 class="card-title">{{ $key }} (<span class="price text-danger-2"><b> {{ item.total / 100 | currency '' }} </b></span>) </h4>
    <div class="">
      <div class="card text-center card-black" v-for="data in item">
        <blockquote class="card-block">
          <h4 class="card-title">{{ data.person }}</h4>
          <p class="card-text">花费了</p>
          <p class="card-text price text-danger-2"><b>{{ data.spend / 100 | currency ''}}</b></p>
          <p>用于<a class="card-link">{{ data.cat }}</a></p>
          <footer class="text-muted text-right">
            <small>
              {{ data.time }}
            </small>
          </footer>
        </blockquote>
        <div class="card-footer text-muted text-center" v-if="data.note">{{ data.note }}</div>
      </div>
    </div>
    <hr>
  </div>`
});
