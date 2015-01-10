BlockOverhead.Views.AnswerList = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.empty();
    var that = this;
    this.collection.each( function(answer) {
      var answerView = new BlockOverhead.Views.AnswerListItem({
        model: answer
      });
      that.$el.append(answerView.render().$el);
    });
    return this;
  }
});
