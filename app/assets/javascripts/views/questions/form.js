BlockOverhead.Views.QuestionForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['questions/form'],
  events: {
    'click .submit':'submit'
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
    this.model.set('asker_id', 1);
    this.model.save({}, {
      success: function() {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate('/questions/' + that.model.id, { trigger: true });
      }
    });
  }
});
