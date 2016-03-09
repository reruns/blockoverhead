BlockOverhead.Views.AnswerList = Backbone.View.extend({
  template: JST['answers/list'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    this.$el.html(this.template({
      size: this.collection.length
    }));
    var that = this;
    var $list = this.$el.find('#answer-list');
    this.collection.each( function(answer) {
      var answerView = new BlockOverhead.Views.AnswerListItem({
        model: answer,
        collection: that.collection,
        owner: that.model
      });
      $list.append(answerView.render().$el);
    });
    return this;
  }
});
