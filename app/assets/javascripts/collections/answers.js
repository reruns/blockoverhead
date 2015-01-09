BlockOverhead.Collections.Answers = Backbone.Collection.extend({
  model: BlockOverhead.Models.Answer,
  url: '/api/answers',

  initialize: function(models, options) {
    this.question = options.question
  }
})
