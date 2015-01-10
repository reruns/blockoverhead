BlockOverhead.Views.PostedBy = Backbone.View.extend({
  template: JST['users/posted_by'],
  render: function() {
    this.$el.html(this.template({
      author: this.model
    }));
    return this;
  }
});
