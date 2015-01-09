BlockOverhead.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    /*
    we probably won't be using the navbar much
    unless we end up implementing notifications or something
    the main nav is completely static, and the user nav, at the very top
    won't really change without a feature like that.

    Just in case, I'm leaving it in for now. :3
    */

    this.$rootEl = options.$rootEl,
    this.$navbar = options.$navbar
  },

  routes: {
    '':'questionsIndex',
    'questions':'questionsIndex',
    'questions/:id':'questionShow',
    'users':'usersIndex',
    'users/:id':'usersShow'
  },

  questionsIndex: function() {
    BlockOverhead.Collections.questions.fetch();

    var view = new BlockOverhead.Views.QuestionsIndex({
      collection: BlockOverhead.Collections.questions
    });
    this._swapRoot(view);
  },

  questionShow: function(id) {
    var question = BlockOverhead.Collections.questions.getOrFetch(id);
    var view = new BlockOverhead.Views.QuestionShow({ model: question});
    this._swapRoot(view);
  },

  usersIndex: function() {
    BlockOverhead.Collections.users.fetch();

    var view = new BlockOverhead.Views.UsersIndex({
      collection: BlockOverhead.Collections.users
    });
    this._swapRoot(view);
  },

  usersShow: function(id) {
    var user = BlockOverhead.Collections.users.getOrFetch(id);
    var view = new BlockOverhead.Views.UserShow({ model: user });
    this._swapRoot(view);
  },

  _swapRoot: function(view) {
    this._currentRoot && this._currentRoot.remove();
    this._currentRoot = view;
    this.$rootEl.html(view.render().$el);
  }
});
