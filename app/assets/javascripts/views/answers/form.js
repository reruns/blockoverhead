BlockOverhead.Views.AnswerForm = Backbone.View.extend({
  tagName: 'form',
  render: function() {
    this.$el.html(this.template({ answer: this.model }));
    return this;
  },

  initialize: function(options) {
    this.template = options.template;
  },

  events: {
    'click button':'submit'
  },

  submit: function(event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    var question = this.collection.question;
    this.model.set(attrs.answer);
    this.model.save({question_id: question.id}, {
      success: function() {
        that.collection.add(that.model, { merge: true });
        that.remove();
      }
    })
  }
})
