BlockOverhead.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.syncDraw);
    this.listenTo(this.model.answers(), 'add remove reset', this.syncDraw);
  },

  events: {
    'click .edit':'edit'
  },

  render: function() {
    this.$el.html(this.template());

    var questionInfo = new BlockOverhead.Views.ShowQuestionData({
      model: this.model
    }), authorView = new BlockOverhead.Views.PostedBy({
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
      model: new BlockOverhead.Models.Answer(),
      template: JST['answers/form']
    });

    this.$el.find('.posted-by').html(authorView.render().$el);
    this.$el.find('.comments').html(commentsView.render().$el);
    this.$el.find('.likes').html(likesView.render().$el);
    this.$el.find('#answers').html(answersView.render().$el);
    this.$el.find('#tags').html(tagsView.render().$el);
    this.$el.find('#new-answer').html(answerForm.render().$el);

    return this;
  },

  syncDraw: function() {
    var questionInfo = new BlockOverhead.Views.ShowQuestionData({
      model: this.model
    }), authorView = new BlockOverhead.Views.PostedBy({
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
    })

    this.$el.find('#question-info').html(questionInfo.render().$el)
    this.$el.find('.posted-by').html(authorView.render().$el);
    this.$el.find('.comments').html(commentsView.render().$el);
    this.$el.find('.likes').html(likesView.render().$el);
    this.$el.find('#answers').html(answersView.render().$el);
    this.$el.find('#tags').html(tagsView.render().$el);

    return this;
  },

  edit: function(event) {
    event.preventDefault();
    this.$el.find('#question-title').empty();
    this.$el.find('#question-data').empty();
    var view = new BlockOverhead.Views.QuestionForm({
      model: this.model,
      collection: BlockOverhead.Collections.questions,
      template: JST['questions/edit']
    });
    BlockOverhead.editView = view;
    this.$el.prepend(view.render().$el);
    if (BlockOverhead.editView) {
      var eConverter = Markdown.getSanitizingConverter();
      var eEditor = new Markdown.Editor(eConverter, '-2');
      eEditor.run();
    }
  }

})
