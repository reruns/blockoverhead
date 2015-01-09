BlockOverhead.Views.UsersIndex = Backbone.View.extend({
  tagName: 'ul',
  template: JST['users/index'],

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.html(this.template());
    var that = this;
    this.collection.each(function(user) {
      var userView = new BlockOverhead.Views.UsersIndexItem({
        model: user
      });
      that.$el.append(userView.render().$el);
    });
    return this;
  }
})
