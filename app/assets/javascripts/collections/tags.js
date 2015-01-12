BlockOverhead.Collections.Tags = Backbone.Collection.extend({
  model: BlockOverhead.Models.Tag,
  url: '/api/tags',

  initialize: function(models, options) {
    this.question = options.question;
    this.user = options.user;
  }
})

BlockOverhead.Collections.tags = new BlockOverhead.Collections.Tags([], {});
