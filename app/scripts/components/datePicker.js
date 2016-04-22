let options = {
  useCurrent: false,
  showClear: true,
  showClose: false,
  minView: 2,
  fontAwesome: true,
  format: 'yyyy/m/d',
  autoclose: true,
  language: 'zh-CN'
};

export default Vue.component('datePicker', {
  replace: true,
  inherit: false,
  template: `<div class='input-group date'>
                <input class='form-control' v-model='model' type='text' readonly>
                <span class='input-group-addon'>
                  <i class='fa fa-fw fa-calendar'></i>
                </span>
             </div>`,
  props: ['model'],
  ready: function() {
    $(this.$el).datetimepicker(options);
  }
});
