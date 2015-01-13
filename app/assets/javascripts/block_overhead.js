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

    //TODO: maybe set up a view here for our navbar
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
