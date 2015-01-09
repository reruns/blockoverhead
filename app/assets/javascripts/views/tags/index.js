BlockOverhead.Views.TagsIndex = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.empty();
    var that = this;
    this.collection.each(function(tag) {
      var tagView = new BlockOverhead.Views.TagsIndexItem({
        model: tag
      });
      that.$el.append(tagView.render().$el);
    });
    return this;
  }
})
