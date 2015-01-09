BlockOverhead.Models.Tag = Backbone.Model.extend({
  urlRoot: '/api/tags',

  questions: function() {
    if (!this._questions) {
      this._questions = new BlockOverhead.Collections.Questions([], { tag: this });
    }
    return this._questions;
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
