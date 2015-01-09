BlockOverhead.Views.QuestionsIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['questions/index_item'],
  render: function() {
    this.$el.html(this.template({
      question: this.model
    }));
    return this;
  }
});
