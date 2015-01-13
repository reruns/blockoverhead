BlockOverhead.Views.AnswerForm = Backbone.View.extend({
  tagName: 'form',
  render: function() {
    this.$el.html(this.template({ answer: this.model }));
    return this;
  },

  initialize: function(options) {
    this.edit = options.edit;
    this.template = (this.edit ? JST['answers/edit'] : JST['answers/form']);
  },

  events: {
    'click button':'submit',
    'click button#submit-edit':'submit'
  },

  submit: function(event) {
    event && event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    var question = this.collection.question;
    this.model.set(attrs.answer);
    this.model.author().set(BlockOverhead.currentUser);
    this.model.save({question_id: question.id}, {
      success: function() {
        that.collection.add(that.model, { merge: true });
        if (that.edit) {
          BlockOverhead.editView = null;
          that.remove();
        } else {
          that.$el.find('textarea').val('');
          that.model = new BlockOverhead.Models.Answer();
        }
      }
    })
  }
})
