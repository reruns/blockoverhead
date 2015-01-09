BlockOverhead.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl,
    this.$navbar = options.$navbar
  },

  //for now just index
  routes: {
    '':'questionsIndex',
    'users/show':'usersIndex',
    'users/:id':'showUser'
  },

  usersIndex: function() {//TODO
    BlockOverhead.Collections.users.fetch();

    var view = new BlockOverhead.Views.usersIndex({
      collection: BlockOverhead.Collections.users
    });
    this._swapMain(view);
  },

  swapRoot: function(view) {
    this._currentRoot && this._currentRoot.remove();
    this._currentRoot = view;
    this.$rootEl.html(view.render().$el);
  }

});
