BlockOverhead.Views.CommentList = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.empty();
    var that = this;
    this.collection.each( function(comment) {
      var commentView = new BlockOverhead.Views.CommentListItem({
        model: comment
      });
      that.$el.append(commentView.render().$el);
    });
    return this;
  }
});
