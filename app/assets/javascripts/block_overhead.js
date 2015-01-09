window.BlockOverhead = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new BlockOverhead.Routers.Router({
      //$rootEl: TODO SMTH IUNNO
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  BlockOverhead.initialize();
});
