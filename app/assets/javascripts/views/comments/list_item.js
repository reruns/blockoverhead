BlockOverhead.Views.CommentListItem = Backbone.View.extend({
  tagName: 'li',
  className: 'comment',
  template: JST['comments/list_item'],
  events: {
    'click .delete-comment':'delete'
  },

  render: function() {
    this.$el.html(this.template({ comment: this.model }));

    var authorView = new BlockOverhead.Views.PostedBy({
      model: this.model.author()
    });

    this.$el.find('.posted-by').html(authorView.render().$el);
    return this;
  },

  delete: function(event) {
    event.preventDefault();
    this.model.destroy();
  }
});
