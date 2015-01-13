BlockOverhead.Views.ShowQuestionData = Backbone.View.extend({
  template: JST['questions/show_data'],

  render: function() {
    this.$el.html(this.template({question: this.model }));
    return this;
  }
})
