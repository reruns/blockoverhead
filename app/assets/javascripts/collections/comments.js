BlockOverhead.Collections.Comments = Backbone.Collection.extend({
  model: BlockOverhead.Models.Comment,
  url: '/api/comments',

  initialize: function(models, options) {
    this.post = options.post
  },

  getOrFetch: function(id) {
    var comment = this.get(id),
    comments = this;

    if (!comment) {
      comment = new BlockOverhead.Models.Comment({ id: id });
      comment.fetch({
        success: function() {
          questions.add(comment);
        }
      })
    } else {
      comment.fetch();
    }
    return comment;
  }
});
