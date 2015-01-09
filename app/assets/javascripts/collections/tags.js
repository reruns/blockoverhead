BlockOverhead.Collections.Tags = Backbone.Collection.extend({
  model: BlockOverhead.Models.Tag,
  url: '/api/tags',

  initialize: function(models, options) {
    this.question = options.question
  }
})

BlockOverhead.Collections.tags = new BlockOverhead.Collections.Tags([], {});
