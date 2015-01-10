BlockOverhead.Views.AnswerListItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['answers/list_item'],
  
  render: function() {
    this.$el.html(this.template({ answer: this.model }));

    var authorView = new BlockOverhead.Views.PostedBy({
      model: this.model.author()
    }), commentsView = new BlockOverhead.Views.CommentList({
      collection: this.model.comments()
    });

    this.$el.find('.posted-by').html(authorView.render().$el);
    this.$el.find('.comments').html(commentsView.render().$el);
    return this;
  }
});
