BlockOverhead.Models.Question = Backbone.Model.extend({
  urlRoot: '/api/questions',

  tags: function() {
    if (!this._tags) {
      this._tags = newBlockOverhead.Collections.Tags([], { question: this });
    }
    return this._tags;
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
