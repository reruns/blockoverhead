BlockOverhead.Views.QuestionsIndexItem = Backbone.View.extend({
  tagName: 'li',
  className: 'list-question group',
  template: JST['questions/index_item'],
  render: function() {
    this.$el.html(this.template({ question: this.model }));
    return this;
  }
});
