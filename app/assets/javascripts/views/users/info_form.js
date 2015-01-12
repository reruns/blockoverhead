BlockOverhead.Views.UserInfoForm = new Backbone.View.extend({
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
    console.log('you got it dude');
  }

})
