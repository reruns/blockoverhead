BlockOverhead.Views.LikesForm = Backbone.View.extend({
  template: JST['likes/form'],
  events: {
    'click .upvote':'upvote',
    'click .downvote':'downvote'
  },

  render: function() {
    this.$el.html(this.template({ post: this.model }));
    return this;
  },

  upvote: function(event) {
    event.preventDefault();
  },

  downvote: function(event) {
    event.preventDefault();
  }
});
