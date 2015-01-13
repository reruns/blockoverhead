BlockOverhead.Views.QuestionForm = Backbone.View.extend({
  tagName: 'form',
  events: {
    'click .submit':'submit'
  },

  initialize: function(options) {
    this.template = options.template;
  },

  render: function() {
    this.$el.html(this.template({ question: this.model }));
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().question,
        that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function() {
        BlockOverhead.editView = null;
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate('/questions/' + that.model.id, { trigger: true });
      }
    });
  }
});
