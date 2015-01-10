BlockOverhead.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function() {
    var questionsView = new BlockOverhead.Views.QuestionsIndex({
      collection: this.model.questions()
    }), answersView = new BlockOverhead.Views.QuestionsIndex({
      collection: this.model.answers()
    });

    debugger;

    this.$el.html(this.template({ user: this.model }));
    this.$el.find('#questions').html(questionsView.render().$el);
    this.$el.find('#answers').html(answersView.render().$el);
    return this;
  }
})
