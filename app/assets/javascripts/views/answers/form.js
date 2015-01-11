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
  
  submit: function() {
    var that = this;
    var attrs = this.$el.serializeJSON();
    var ans = new BlockOverhead.Models.Answer();
    ans.save(attrs, {
      success: function() {
        that.collection.add(ans, { merge: true });
      }
    }
  }
})