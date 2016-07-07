export default function(winObj){
  return Vue.extend({
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
}
