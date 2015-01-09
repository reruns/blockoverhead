BlockOverhead.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl,
    this.$navbar = options.$navbar
  },

  //for now just index
  router: {
    '':'index'
  },

  index: function() {//TODO
    //outline:
    //fetch the collection
    //make some kind of view
    //s-s-s-swap it in
    BlockOverhead.Collections.users.fetch();
  }

});
