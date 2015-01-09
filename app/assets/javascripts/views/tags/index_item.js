BlockOverhead.Views.TagsIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['tags/index_item'],
  render: function() {
    this.$el.html(this.template({
      tag: this.model
    }));
    return this;
  }
});
