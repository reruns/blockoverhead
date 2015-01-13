BlockOverhead.Views.AnswerListItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['answers/list_item'],

  events: {
    'click .edit-answer':'edit',
    'click .accept-answer':'accept'
  },

  initialize: function(options) {
    this.model = options.model;
    this.collection = options.collection;
    this.owner = options.owner;
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    this.$el.html(this.template({
        answer: this.model,
        owner: this.owner
      })
    );

    var authorView = new BlockOverhead.Views.PostedBy({
      model: this.model.author()
    }), commentsView = new BlockOverhead.Views.CommentList({
      collection: this.model.comments()
    }), likesView = new BlockOverhead.Views.LikesForm({
      model: this.model
    });

    this.$el.find('.posted-by').html(authorView.render().$el);
    this.$el.find('.likes').html(likesView.render().$el);
    this.$el.find('.comments').html(commentsView.render().$el);
    return this;
  },

  edit: function(event) {
    event.preventDefault();
    var view = new BlockOverhead.Views.AnswerForm({
      model: this.model,
      collection: this.collection,
      edit: true,
      template: JST['answers/edit']
    });
    BlockOverhead.editView = view;
    this.$el.prepend(view.render().$el);
    debugger;
    if (BlockOverhead.editView) {
      var eConverter = Markdown.getSanitizingConverter();
      var eEditor = new Markdown.Editor(eConverter, '-2');
      eEditor.run();
    }
    this.$el.html(view.render().$el);
  },

  accept: function(event) {
    event.preventDefault();
    var that = this;
    $.ajax({
      type: 'POST',
      url: '/api/answers/'+this.model.id+'/accept',
      success: function() {
        that.collection.each(function(ans){
          ans.fetch();
        });
      }
    });
  }
});
