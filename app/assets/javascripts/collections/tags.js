BlockOverhead.Collections.Tags = Backbone.Collection.extend({
  model: BlockOverhead.Models.Tag,
  url: '/api/tags',

  initialize: function(models, options) {
    this.question = options.question;
    this.user = options.user;
  },

  parse: function(response) {
    if (response.page) {
      this.page = response.page;
      this.total_pages = response.total_pages;
      return response.models;
    } else {
      return Backbone.Collection.prototype.parse.call(this, response);
    }
  }
})

BlockOverhead.Collections.tags = new BlockOverhead.Collections.Tags([], {});
