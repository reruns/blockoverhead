BlockOverhead.Views.AnswerForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['answers/form'],
  render: function() {
    this.$el.html(this.template());
    return this;
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
