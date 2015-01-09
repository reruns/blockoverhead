BlockOverhead.Views.QuestionsIndex = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.empty();
    var that = this;
    this.collection.each(function(question) {
      var userView = new BlockOverhead.Views.QuestionsIndexItem({
        model: question
      });
      that.$el.append(userView.render().$el);
    });
    return this;
  }
})
