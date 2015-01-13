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

BlockOverhead.buildEditor = function(id) {
  var converter = Markdown.getSanitizingConverter();
  var editor = new Markdown.Editor(converter, id);

  //set up the hook for uploading images
  editor.hooks.set("insertImageDialog", function(callback) {
    //outline:
    //pop up a modal file picker dialog
    //upload it!
    //get the url and do callback(url)
    //profit!
    return true;
  });
  editor.run();
}
