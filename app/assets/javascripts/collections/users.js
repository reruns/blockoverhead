BlockOverhead.Collections.Users = Backbone.Collection.extend({
  model: BlockOverhead.Models.User,
  url: '/api/users',

  getOrFetch: function(id) {
    var user = this.get(id),
        users = this;

    if (!user) {
      user = new BlockOverhead.Models.User({ id: id });
      user.fetch({
          success: function() {
            users.add(user);
          }
      })
    } else {
      user.fetch();
    }
    return user;
  },

  parse: function(response) {
    if (response.page) {
      this.page = response.page;
      this.total_pages = response.total_pages;
      return response.models;
    } else {
      return Backbone.Collection.prototype.parse.call(this, response);
    }
  }
})

BlockOverhead.Collections.users = new BlockOverhead.Collections.Users();
