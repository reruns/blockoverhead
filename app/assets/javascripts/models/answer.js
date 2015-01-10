BlockOverhead.Models.Answer = Backbone.Model.extend({
  urlRoot: '/api/answers',

  author: function() {
    if (!this._author) {
      this._author = new BlockOverhead.Models.User();
    }
    return this._author
  },

  comments: function() {
    if (!this._comments) {
      this._comments = new BlockOverhead.Collections.Comments([], { post: this });
    }
    return this._comments;
  },

  parse: function(response) {
    if (response.user) {
      this.author().set(response.author, { parse: true });
      delete response.author
    }

    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }
    return response;
  }
})
