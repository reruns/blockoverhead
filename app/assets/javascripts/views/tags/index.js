BlockOverhead.Views.TagsIndex = Backbone.View.extend({
  template: JST['tags/index'],

  events: {
    'keyup #tag-search':'filterList'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.html(this.template());
    this.buildList();
    return this;
  },

  buildList: function() {
    var $list = this.$el.find('#tags-list');
    $list.empty();
    var that = this;
    this.collection.each(function(tag) {
      var tagView = new BlockOverhead.Views.TagsIndexItem({
        model: tag
      });
      $list.append(tagView.render().$el);
    });
  },

  filterList: function(event) {
    var that = this,
        query = $(event.currentTarget).val();
    if (query === '') {
      that.collection = BlockOverhead.Collections.tags;
      that.buildList();
    } else {
      $.ajax({
        url: '/api/tags/search',
        type: 'GET',
        data: {query: query},
        success: function(response) {
            that.collection = new BlockOverhead.Collections.Tags(response, {});
            that.buildList();
          }
      });
    }
  }
})
