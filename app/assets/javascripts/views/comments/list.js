BlockOverhead.Views.CommentList = Backbone.View.extend({
  template: JST['comments/list'],
  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },
  events: {
    'click add-comment':'comment'
  },

  render: function() {
    this.$el.html(this.template())
    var $list = this.$el.find('ul');
    this.collection.each( function(comment) {
      var commentView = new BlockOverhead.Views.CommentListItem({
        model: comment
      });
      $list.append(commentView.render().$el);
    });
    return this;
  },

  comment: function(event) {
    var view = new BlockOverhead.Views.CommentForm({
      collection: this.collection
    });
    this.$el.find('.new-comment').html(view.render().$el);
  }
});
