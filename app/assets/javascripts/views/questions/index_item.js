BlockOverhead.Views.QuestionsIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['questions/indexItem'],
  render: function() {
    this.$el.html(this.template({
      user: this.model
    }));
    return this;
  }
});
