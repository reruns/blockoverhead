BlockOverhead.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

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

  parse: function(response) {
    if (response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    if (response.questions) {
      this.questions().set(response.questions, { parse: true });
      delete response.questions;
    }

    return response;
  }
});
