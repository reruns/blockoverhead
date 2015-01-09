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
  }
})

BlockOverhead.Collections.questions = new BlockOverhead.Collections.Questions();
