BlockOverhead.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  toJSON: function() {
    var json = {user: _.clone(this.attributes)};
    if (this._avatar) {
      json.user.avatar = this._avatar
    }
    return json;
  },

  questions: function() {
    if (!this._questions) {
      this._questions = new BlockOverhead.Collections.Questions([], { user: this });
    }
    return this._questions
  },

  answers: function() {
    if (!this._answers) {
      this._answers = new BlockOverhead.Collections.Answers([], { user: this });
    }
    return this._answers;
  },

  tags: function() {
    if (!this._tags) {
      this._tags = new BlockOverhead.Collections.Tags([], { user: this });
    }
    return this._tags;
  },

  parse: function(response) {
    if (response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    if (response.questions) {
      this.questions().set(response.questions, { parse: true });
      delete response.questions;
    }

    if (response.tags) {
      this.tags().set(response.tags, { parse: true });
      delete response.tags;
    }

    return response;
  }
});
