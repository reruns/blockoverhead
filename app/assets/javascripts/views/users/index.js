BlockOverhead.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  events: {
    'keyup #user-search':'filterList'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.html(this.template());
    this.buildList();
    return this;
    var that = this;
    this.collection.each(function(user) {
      var userView = new BlockOverhead.Views.UsersIndexItem({
        model: user
      });
      that.$el.append(userView.render().$el);
    });
    return this;
  },

  buildList: function() {
    var $list = this.$el.find('#users-list');
    $list.empty();
    var that = this;
    this.collection.each(function(user) {
      var userView = new BlockOverhead.Views.UsersIndexItem({
        model: user
      });
      $list.append(userView.render().$el);
    });
  },

  filterList: function(event) {
    var that = this,
    query = $(event.currentTarget).val();
    if (query === '') {
      that.collection = BlockOverhead.Collections.users;
      that.buildList();
    } else {
      $.ajax({
        url: '/api/users/search',
        type: 'GET',
        data: {query: query},
        success: function(response) {
          that.collection = new BlockOverhead.Collections.Users(response, {});
          that.buildList();
        }
      });
    }
  }
})
