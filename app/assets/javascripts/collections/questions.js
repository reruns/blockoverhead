BlockOverhead.Collections.Questions = Backbone.Collection.extend({
  model: BlockOverhead.Models.Question,
  url: '/api/questions',

  getOrFetch: function(id) {
    var question = this.get(id),
        questions = this;

    if (!question) {
      question = new BlockOverhead.Models.Question({ id: id });
      question.fetch({
        success: function() {
          questions.add(question);
        }
      })
    } else {
      question.fetch();
    }
    return question;
  },

  parse: function(response) {
    this.page = response.page;
    this.total_pages = response.total_pages;
    return response.models;
  }
}),

BlockOverhead.Collections.questions = new BlockOverhead.Collections.Questions();
