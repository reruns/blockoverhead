BlockOverhead.Views.AnswerListItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['answers/list_item'],

  events: {
    'click .edit-answer':'edit'
  },

  render: function() {
    this.$el.html(this.template({ answer: this.model }));
    var authorView = new BlockOverhead.Views.PostedBy({
      model: this.model.author()
    }), commentsView = new BlockOverhead.Views.CommentList({
      collection: this.model.comments()
    }), likesView = new BlockOverhead.Views.LikesForm({
      model: this.model
    });

    this.$el.find('.posted-by').html(authorView.render().$el);
    this.$el.find('.likes').html(likesView.render().$el);
    this.$el.find('.comments').html(commentsView.render().$el);
    return this;
  },

  edit: function(event) {
    event.preventDefault();
    debugger;
    var view = new BlockOverhead.Views.AnswerForm({
      model: this.model,
      collection: this.collection
    })
    this.$el.html(view.render().$el);
  }

  // edit: function(event) {
  //   event.preventDefault();
  //   this.$el.find('#question-title').empty();
  //   this.$el.find('#question-data').empty();
  //   var view = new BlockOverhead.Views.QuestionForm({
  //     model: this.model,
  //     collection: BlockOverhead.Collections.questions
  //   });
  //   this.$el.prepend(view.render().$el);
  // }
});
