BlockOverhead.Views.UsersIndexItem = Backbone.View.extend({
  tagName: 'a',
  attributes: {href: "#/users/"+this.id},
  template: JST['users/index_item'],
  render: function() {
    this.$el.html(this.template({
      user: this.model
    }));
    return this;
  }
});
