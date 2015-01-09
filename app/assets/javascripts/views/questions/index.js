BlockOverhead.Views.QuestionsIndex = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    debugger;
    this.$el.empty();
    var that = this;
    this.collection.each(function(question) {
      var questionView = new BlockOverhead.Views.QuestionsIndexItem({
        model: question
      });
      that.$el.append(questionView.render().$el);
    });
    return this;
  }
})
