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

  parse: function(response) {
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    if (response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }
    return response;
  }
});
