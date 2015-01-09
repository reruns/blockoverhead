BlockOverhead.Views.UsersIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['users/indexItem'],
  render: function() {
    this.$el.html(this.template({
      user: this.model
    }));
    return this;
  }
});
