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
      this._answers = new BlockOverhead.Collections.Answers([], {question: this });
    }
    return this._answers;
  },

  parse: function(response) {
    var that = this;
    if (response.questions) {
      that.questions().set(response.questions, { parse: true });
      delete response.questions;
    }
    return response;
  }
});
