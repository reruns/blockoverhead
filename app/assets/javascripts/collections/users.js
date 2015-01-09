BlockOverhead.Collections.Users = Backbone.Collection.extend({
  model: BlockOverhead.Models.User,
  url: '/api/users',

  getOrFetch: function(id) {
    var user = this.get(id);
    var users = this;

    if (!user) {
      user = new BlockOverhead.Models.User({id: id});
      user.fetch({
          success: function() {
            users.add(user);
          }
      })
    } else {
      user.fetch();
    }
    return user;
  }
})

BlockOverhead.Collections.users = new BlockOverhead.Collections.Users();
