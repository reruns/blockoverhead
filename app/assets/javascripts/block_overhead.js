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
    Backbone.history.start();
  }
};

$(document).ready(function(){
  BlockOverhead.initialize();
});
