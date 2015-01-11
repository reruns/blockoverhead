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
    var ans = new BlockOverhead.Models.Answer();
    ans.set(attrs.answer);
    ans.save({question_id: this.model.id}, {
      success: function() {
        that.collection.add(ans, { merge: true });
        that.remove();
      }
    })
  }
})
