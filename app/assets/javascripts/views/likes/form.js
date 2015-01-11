BlockOverhead.Views.LikesForm = Backbone.View.extend({
  template: JST['likes/form'],
  events: {
    'click #upvote':'upvote',
    'click #downvote':'downvote'
  },

  render: function() {
    this.$el.html(this.template({ post: this.model }));
    return this;
  },

  upvote: function(event) {
    console.log('up');
    var type = this.getType();
    $.ajax({
      url: '/api/likes',
      type: 'POST',
      data: {
        positive: true,
        likeable_type: type,
        likeable_id: this.model.id
      }
    })
  },

  downvote: function(event) {
    console.log('down');
    var type = this.getType();
    $.ajax({
      url: '/api/likes',
      type: 'POST',
      data: {
        positive: false,
        likeable_type: type,
        likeable_id: this.model.id
      }
    })
  },
  
  getType: function() {
    var type;
    if (this.model instanceof BlockOverhead.Models.Question) {
      type = 'Question'
    } else {
      type = 'Answer'
    }
    return type;
  }
});
