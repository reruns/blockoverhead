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
    BlockOverhead.currentUser = new BlockOverhead.Models.User();
    $.ajax({
      url: "/api/session",
      type: "GET",
      success: function(data){
        Backbone.history.start();
        if(data){
          BlockOverhead.currentUser.set(data);
        }
      }
    });
  }
};

$(document).ready(function(){
  BlockOverhead.initialize();
});
