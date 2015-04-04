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
        type = this.getType();
        post = this.collection.post
    comment.set(formData.comment);
    comment.save({
      commentable_type: type,
      commentable_id: post.id
      }, { success: function() {
        that.collection.add(comment, { merge: true });
        that.remove();
      },
      error: function() {
        console.log('hm');
        window.location = '/session/new';
      }
    });
  },

  getType: function() {
    var type;
    if (this.collection.post instanceof BlockOverhead.Models.Question) {
      type = 'Question'
    } else {
      type = 'Answer'
    }
    return type;
  }
})
