BlockOverhead.Views.UsersIndexItem = Backbone.View.extend({
  tagName: 'a',
  template: JST['users/index_item'],
  attributes: function() {
      return {href: "#/users/"+this.model.id}
  },

  render: function() {
    this.$el.html(this.template({
      user: this.model
    }));
    return this;
  }
});
