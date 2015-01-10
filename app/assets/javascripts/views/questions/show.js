BlockOverhead.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    this.$el.html(this.template({ question: this.model }));

    var comments-view = new BlockOverhead.Views.CommentList({ post: this.model })

    this.$el.find('comments').html()
    return this;
  }
})
