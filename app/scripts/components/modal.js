export default Vue.component('modal', {
  methods:{
    showModal (){
      return $(this.$el).modal('show');
    },
    hideModal (){
      return $(this.$el).modal('hide');
    }
  },
  template: `<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <slot name="header">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">Modal title</h4>
          </div>
        </slot>
        <slot name="body">
          <div class="modal-body">
            ...
          </div>
        </slot>
        <slot name="footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</div>`
});
