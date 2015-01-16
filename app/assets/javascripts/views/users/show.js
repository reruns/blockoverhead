BlockOverhead.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  className: 'user-show',
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  events: {
    'click button':'edit'
  },

  render: function() {

    this.$el.html(this.template({ user: this.model }));
    var tagsView = new BlockOverhead.Views.SubTags({
      collection: this.model.tags()
    });

    var $qs = this.$el.find('#questions');
    this.model.questions().forEach(function(question) {
      qview = new BlockOverhead.Views.QuestionsIndexItem({
        model: question
      });
      $qs.append(qview.render().$el);
    })

    var $as = this.$el.find('#answers');
    this.model.answers().forEach(function(answer) {
      aview = new BlockOverhead.Views.QuestionsIndexItem({
        model: answer
      });
      $as.append(aview.render().$el);
    })

    this.$el.find('#tags').html(tagsView.render().$el);
    return this;
  },

  edit: function(event) {
    event.preventDefault();
    var view = new BlockOverhead.Views.UserInfoForm({
      model: this.model
    });
    this.$el.find('#user-data').html(view.render().$el);
  }
})
