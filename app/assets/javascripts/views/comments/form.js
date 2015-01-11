BlockOverhead.Views.CommentForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['comments/form'],
  events: {
    'click button':'submit'
  },
  
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    var that = this,
        formData = this.$el.serializeJSON(),
        comment = new BlockOverhead.Models.Comment();
    comment.save(formData, {
      success: function() {
        that.collection.add(comment, { merge: true });
        that.remove();
      }
    });
  }
})