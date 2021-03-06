BlockOverhead.Views.QuestionForm = Backbone.View.extend({
  tagName: 'form',
  className: 'new-question',

  events: {
    'click .submit':'submit'
  },

  initialize: function(options) {
    this.edit = options.edit;
    this.template = (this.edit ? JST['questions/edit'] : JST['questions/form']);
  },

  render: function() {
    this.$el.html(this.template({ question: this.model }));
    return this;
  },

  submit: function(event) {
    event && event.preventDefault();
    var attrs = this.$el.serializeJSON().question,
        that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function() {
        that.collection.add(that.model, { merge: true });
        if (that.edit) {
          BlockOverhead.editView = null;
          that.remove();
        } else {
          Backbone.history.navigate('/questions/' + that.model.id, { trigger: true });
        }
      },
      error: function() {
        console.log('hm');
        window.location = '/session/new';
      }
    });
  }
});
