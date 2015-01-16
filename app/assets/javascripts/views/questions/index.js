BlockOverhead.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],

  events: {
    'click a.page':'changePage'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    debugger;
    this.$el.html(this.template({
      page: this.collection.page,
      pages: this.collection.total_pages
    }));
    var $list = this.$el.find('#questions-list');
    var that = this;
    this.collection.each(function(question) {
      var questionView = new BlockOverhead.Views.QuestionsIndexItem({
        model: question
      });
      $list.append(questionView.render().$el);
    });
    return this;
  },

  changePage: function(event) {
    event.preventDefault();
    var page = Number($(event.currentTarget).attr('id')),
        that = this;
    this.collection.fetch({
      data: {page: page},
      success: function() {
        that.render();
      }
    });
  }
})
