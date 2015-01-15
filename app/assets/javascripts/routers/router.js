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
    this.enableSearch();
  },

  routes: {
    '':'questionsIndex',
    'questions':'questionsIndex',
    'ask':'questionNew',
    'questions/:id':'questionShow',
    'users':'usersIndex',
    'users/:id':'usersShow',
    'tags':'tagsIndex',
    'questions/tagged/:tag':'taggedQuestions',
    'unanswered':'unansweredQuestions'
  },

  questionsIndex: function() {
    BlockOverhead.Collections.questions.fetch({
      data: { page: 1 }
    });

    var view = new BlockOverhead.Views.QuestionsIndex({
      collection: BlockOverhead.Collections.questions
    });
    this._swapRoot(view);
  },

  questionNew: function() {
    var question = new BlockOverhead.Models.Question(),
        view = new BlockOverhead.Views.QuestionForm({
          model: question,
          collection: BlockOverhead.Collections.questions,
          edit: false
        });
    this._swapRoot(view);

    BlockOverhead.buildEditor();
  },

  questionShow: function(id) {
    var question = BlockOverhead.Collections.questions.getOrFetch(id),
        view = new BlockOverhead.Views.QuestionShow({ model: question });
    this._swapRoot(view);

    BlockOverhead.buildEditor();
  },

  usersIndex: function() {
    BlockOverhead.Collections.users.fetch();

    var view = new BlockOverhead.Views.UsersIndex({
      collection: BlockOverhead.Collections.users
    });
    this._swapRoot(view);
  },

  usersShow: function(id) {
    var user = BlockOverhead.Collections.users.getOrFetch(id),
        view = new BlockOverhead.Views.UserShow({ model: user });
    this._swapRoot(view);
  },

  tagsIndex: function() {
    BlockOverhead.Collections.tags.fetch({
      data: { page: 1 }
    });

    var view = new BlockOverhead.Views.TagsIndex({
      collection: BlockOverhead.Collections.tags
    });
    this._swapRoot(view);
  },

  taggedQuestions: function(tag) {
    var that = this;
    $.ajax({
      url: '/api/questions/tagged/',
      data: {tag: tag, page: 1},
      type: 'GET',
      success: function(response) {
        var ts = new BlockOverhead.Collections.Questions(response, {parse: true}),
            view = new BlockOverhead.Views.QuestionsIndex({collection: ts});
        that._swapRoot(view);
      }
    });
  },

  unansweredQuestions: function() {
    var that = this;
    $.ajax({
      url: '/api/unanswered',
      type: 'GET',
      success: function(questionData) {
        var uns = new BlockOverhead.Collections.Questions(questionData),
            view = new BlockOverhead.Views.QuestionsIndex({ collection: uns });
        that._swapRoot(view);
      }
    });
  },

  enableSearch: function() {
    //Personally I prefer this to putting it in a script tag on the page.
    var that = this;
    $('#search-form').on('submit', function(event) {
      event.preventDefault();
      var query = $('input#search-bar').val();
      $.ajax({
        url: '/api/search',
        type: 'GET',
        data: {query: query, page: 1},
        success: function(response) {
          if (!response) {
            Backbone.history.navigate('/questions/tagged/'+query, {trigger: true });
          } else {
            Backbone.history.navigate('/search?q='+query);
            var qs = new BlockOverhead.Collections.Questions(response, { parse: true }),
                view = new BlockOverhead.Views.QuestionsIndex({ collection: qs });
            that._swapRoot(view);
          }
        }
      })
    });
  },

  _swapRoot: function(view) {
    this._currentRoot && this._currentRoot.remove();
    this._currentRoot = view;
    this.$rootEl.html(view.render().$el);
  }
});
