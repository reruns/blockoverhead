BlockOverhead.Views.CommentListItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['comments/list_item'],
  render: function() {
    this.$el.html(this.template({ comment: this.model }));

    var authorView = new BlockOverhead.Views.PostedBy({
      model: this.model.author()
    });

    this.$el.find('.posted-by').html(authorView.render().$el);
    return this;
  }
});
