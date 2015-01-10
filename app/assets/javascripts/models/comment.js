BlockOverhead.Models.Comment = Backbone.Model.extend({
  urlRoot: '/api/comments',

  author: function() {
    if (!this._author) {
      this._author = new BlockOverhead.Models.User();
    }
    return this._author
  },

  parse: function(response) {
    if (response.author) {
      this.author().set(response.author, { parse: true });
      delete response.author
    }
    return response;
  }
})
