BlockOverhead.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl,
    this.$navbar = options.$navbar
  },

  routes: {
    '':'questionsIndex',
    'questions':'questionsIndex',
    'users':'usersIndex'
  },

  questionsIndex: function() {
    BlockOverhead.Collections.questions.fetch();

    var view = new BlockOverhead.Views.QuestionsIndex({
      collection: BlockOverhead.Collections.questions
    });
    this._swapRoot(view);
  },

  usersIndex: function() {
    BlockOverhead.Collections.users.fetch();

    var view = new BlockOverhead.Views.UsersIndex({
      collection: BlockOverhead.Collections.users
    });
    this._swapRoot(view);
  },

  _swapRoot: function(view) {
    this._currentRoot && this._currentRoot.remove();
    this._currentRoot = view;
    this.$rootEl.html(view.render().$el);
  }
});
