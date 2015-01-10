BlockOverhead.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    this.$el.html(this.template({ question: this.model }));

    var commentsView = new BlockOverhead.Views.CommentList({
      collection: this.model.comments()
    });

    this.$el.find('.comments').html(commentsView.render().$el);
    debugger;
    return this;
  }
})
