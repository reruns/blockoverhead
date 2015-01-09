BlockOverhead.Views.QuestionsIndex = Backbone.View.extend({
  tagName: 'ul',
  template: JST['question/index'],

  render: function() {
    this.$el.html(this.template());
    var that = this;
    this.collection.each(function(question) {
      var userView = new BlockOverhead.Views.QuestionIndexItem({
        model: question
      });
      that.$el.append(userView.render().$el);
    });
    return this;
  }
})
