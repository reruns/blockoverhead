BlockOverhead.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  events: {
    'click button':'edit'
  },

  render: function() {
    var questionsView = new BlockOverhead.Views.QuestionsIndex({
      collection: this.model.questions()
    }), answersView = new BlockOverhead.Views.QuestionsIndex({
      collection: this.model.answers()
    }), tagsView = new BlockOverhead.Views.SubTags({
      collection: this.model.tags()
    });

    this.$el.html(this.template({ user: this.model }));
    this.$el.find('#tags').html(tagsView.render().$el);
    this.$el.find('#questions').html(questionsView.render().$el);
    this.$el.find('#answers').html(answersView.render().$el);
    return this;
  },

  edit: function(event) {
    event.preventDefault();
    var view = new BlockOverhead.Views.UserInfoForm({
      model: this.model
    });
    this.$el.find('#user-data').html(view.render().$el);
  }
})
