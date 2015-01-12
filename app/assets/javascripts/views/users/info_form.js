BlockOverhead.Views.UserInfoForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['users/info_form'],

  render: function() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  events: {
    'click button':'submit'
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON(),
        that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function() {
        that.remove();
      }
    })
  }

})
