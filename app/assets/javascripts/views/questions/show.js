BlockOverhead.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.answers(), 'add remove reset', this.render);
  },

  events: {
    'click .edit':'edit'
  },

  render: function() {
    this.$el.html(this.template({
      question: this.model
    }));

    var authorView = new BlockOverhead.Views.PostedBy({
      model: this.model.author()
    }), commentsView = new BlockOverhead.Views.CommentList({
      collection: this.model.comments()
    }), answersView = new BlockOverhead.Views.AnswerList({
      collection: this.model.answers(),
      model: this.model.author()
    }), likesView = new BlockOverhead.Views.LikesForm({
      model: this.model
    }), tagsView = new BlockOverhead.Views.SubTags({
      collection: this.model.tags()
    }), answerForm = new BlockOverhead.Views.AnswerForm({
      collection: this.model.answers(),
      model: new BlockOverhead.Models.Answer()
    });


    this.$el.find('.posted-by').html(authorView.render().$el);
    this.$el.find('.comments').html(commentsView.render().$el);
    this.$el.find('.likes').html(likesView.render().$el);
    this.$el.find('#answers').html(answersView.render().$el);
    this.$el.find('#tags').html(tagsView.render().$el);
    this.$el.find('#new-answer').html(answerForm.render().$el);

    return this;
  },

  edit: function(event) {
    event.preventDefault();
    this.$el.find('#question-title').empty();
    this.$el.find('#question-data').empty();
    var view = new BlockOverhead.Views.QuestionForm({
      model: this.model,
      collection: BlockOverhead.Collections.questions
    });
    this.$el.prepend(view.render().$el);
  }

})
