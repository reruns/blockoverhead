window.BlockOverhead = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new BlockOverhead.Routers.Router({
      $rootEl: $('#main'),
      $navbar: $('#headnav')
    });

    //TODO: Set up a view here for our navbar
    // We need some way to get the current user up and keep track of it, though?
    Backbone.history.start();
  }
};

$(document).ready(function(){
  BlockOverhead.initialize();
});
