BlockOverhead.Models.Question = Backbone.Model.extend({
  urlRoot: '/api/questions',

  tags: function() {
    if (!this._tags) {
      this._tags = new BlockOverhead.Collections.Tags([], { question: this });
    }
    return this._tags;
  },

  answers: function() {
    if (!this._answers) {
      this._answers = new BlockOverhead.Collections.Answers([], { question: this });
    }
    return this._answers;
  },

  comments: function() {
    if (!this._comments) {
      this._comments = new BlockOverhead.Collections.Comments([], { post: this });
    }
    return this._comments;
  },

  author: function() {
    if (!this._author) {
      this._author = new BlockOverhead.Models.User();
    }
    return this._author
  },

  tags: function() {
    if (!this._tags) {
      this._tags = new BlockOverhead.Collections.Tags([], { question: this });
    }
    return this._tags
  },

  parse: function(response) {
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    if (response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    if (response.user) {
      this.author().set(response.user, { parse: true });
      delete response.author;
    }

    if (response.tags) {
      this.tags().set(response.tags, { parse: true });
      delete response.tags;
    }

    return response;
  }
});
