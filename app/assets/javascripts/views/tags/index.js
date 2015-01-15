BlockOverhead.Views.TagsIndex = Backbone.View.extend({
  template: JST['tags/index'],

  events: {
    'keyup #tag-search':'filterList',
    'click a.page':'changePage'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add remove reset', this.render)
  },

  render: function() {
    this.$el.html(this.template({
      page: this.collection.page,
      pages: this.collection.total_pages
    }));
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
    this.buildPageNav()
  },

  buildPageNav: function() {
    var pageList = [],
    pages = this.collection.total_pages,
    page = this.collection.page,
    $pages = this.$el.find('#page-nav');
    $pages.empty();
    if (!pages) return;
    if (pages <= 6) {
      for (var i = 1; i <= pages; i++) {
        pageList.push(i);
      }
    } else {
      if (page <= 4) {
        pageList = [1,2,3,4,5,0,pages];
      } else if ((pages - page) <= 4) {
        pageList = [1,0,pages-4,pages-3,pages-2,pages-1,pages];
      } else {
        pageList = [1,0,page-2,page-1,page,page+1,page+2,0,pages];
      }
    }

    pageList.forEach(function(pageNum){
      if (pageNum === 0)
        $pages.append($('<div class="page space">...</div>'));
        else if (pageNum === Number(page))
          $pages.append($('<div class="page cur">'+page+'</div>'));
          else
            $pages.append($('<a href="" class="page link" id="'+ pageNum +'">'+pageNum+ '</a>'));
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
        data: {query: query, page: 1},
        success: function(response) {
            that.collection = new BlockOverhead.Collections.Tags(response, {parse: true});
            that.buildList();
          }
      });
    }
  },

  changePage: function(event) {
    var page = Number($(event.currentTarget).attr('id')),
    that = this;
    event.preventDefault();
    this.collection.fetch({
      data: {page: page},
      success: function() {
        that.render();
      }
    });
  }
})
