BlockOverhead.Collections.Comments = Backbone.Collection.extend({
  model: BlockOverhead.Models.Comment,
  url: '/api/comments',

  initialize: function(models, options) {
    this.post = options.post
  },

  comparator: function(comment) {
    return comment.get('created_at');
  }
});
