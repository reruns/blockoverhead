BlockOverhead.Views.UserShow = Backbone.View.extend({
  template: JST['questions/show'],
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function() {
    //TODO again, don't forget
  }
})
