BlockOverhead.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .new-answer':'answer'
  },

  render: function() {
    this.$el.html(this.template({ question: this.model }));

    var authorView = new BlockOverhead.Views.PostedBy({
      model: this.model.author()
    }), commentsView = new BlockOverhead.Views.CommentList({
      collection: this.model.comments()
    }), answersView = new BlockOverhead.Views.AnswerList({
      collection: this.model.answers()
    }), likesView = new BlockOverhead.Views.LikesForm({
      model: this.model
    }), tagsView = new BlockOverhead.Views.SubTags({
      collection: this.model.tags()
    });

    this.$el.find('.posted-by').html(authorView.render().$el);
    this.$el.find('.comments').html(commentsView.render().$el);
    this.$el.find('.likes').html(likesView.render().$el);
    this.$el.find('#answers').html(answersView.render().$el);
    this.$el.find('#tags').html(tagsView.render().$el);

    return this;
  },

  answer: function(event) {
    event.preventDefault();
  }
})
