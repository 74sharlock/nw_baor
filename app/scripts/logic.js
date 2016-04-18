import index from './components/index';

export default function (winObj) {

  let App = Vue.extend({
    data() {
      return {
        isMax: false
      }
    },
    methods: {
      quit: function () {
        return winObj.close();
      },
      maximize: function () {
        this.isMax ? winObj.unmaximize() : winObj.maximize();
        this.isMax = !this.isMax;
      },
      minimize: function () {
        return winObj.minimize();
      }
    }
  });
  let router = new VueRouter({hashbang: false, history: true});
  router.map({
    '/index': {
      component: index
    }
  });
  router.start(App, '#app');
  router.go('/index');
}
