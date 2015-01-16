BlockOverhead.Views.PostedBy = Backbone.View.extend({
  template: JST['users/posted_by'],
  className: 'posted_by',

  initialize: function(options) {
    this.timestamp = options.timestamp;
  },

  render: function() {
    this.$el.html(this.template({
      author: this.model,
      timestamp: this.timestamp
    }));
    return this;
  }
});
