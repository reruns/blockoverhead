BlockOverhead.Views.SubTags = Backbone.View.extend({
  tagName: 'ul',

  render: function() {
    this.$el.empty();
    var that = this;
    this.collection.each(function(tag) {
      var t = $('<a href=#/questions/tagged/' + tag.get('title') +
                '>' + tag.get('title') + ' </a>');
      that.$el.append(t);
    });

    return this;
  }
});
