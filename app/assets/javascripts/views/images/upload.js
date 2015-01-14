BlockOverhead.Views.UploadImage = Backbone.View.extend({
  className: 'upload',
  template: JST['images/upload'],

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  initialize: function(options) {
    this.callback = options.callback;
  },

  events: {
    'click #image-form > button.local':'submitFromLocal',
    'click #image-form > button.url':'submitFromUrl',
    'click a#close':'closeForm',
    'change input#input-image':'fileInputChange',
    'change input#image-url':'urlInputChange',
    'change input[type=radio]':'maybeChangeSection'
  },

  submitFromLocal: function(event) {
    event.preventDefault();
    var attrs = this.$el.find('#image-form').serializeJSON().image,
        that = this;
    delete attrs.img_url;
    this.model.set(attrs);
    this.model.save({}, {
      success: function() {
        that.remove();
        that.callback(that.model.get('img'));
        $('#modal').addClass('hidden');
      }
    })
  },

  submitFromUrl: function(event) {
    event.preventDefault();
    var attrs = this.$el.find('#image-form').serializeJSON(),
        that = this;
    this.model.set(attrs.image);
    this.model.save({}, {
      success: function() {
        that.remove();
        that.callback(that.model.get('img'));
        $('#modal').addClass('hidden');
      }
    })
  },

  closeForm: function(event) {
    event.preventDefault();
    $('#modal').addClass('hidden');
    this.remove();
    this.callback(null);
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._img = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._img;
    }
  },

  urlInputChange: function(event) {
    var $tar = $(event.currentTarget);
    this._updatePreview($tar.val())
  },

  _updatePreview: function(src){
    this.$el.find("#preview-image").attr("src", src);
  },

  maybeChangeSection: function(event) {
    var $tar = $(event.currentTarget);
    $tar.val() === 'loc' ? this.showLocal() : this.showUrl();
  },

  showLocal: function() {
    $('#image-url').val('');
    $('#local-up').removeClass('hidden');
    $('#url-up').addClass('hidden');
    $('button.url').addClass('local');
    $('button.url').removeClass('url');
  },

  showUrl: function() {
    $('#input-image').val('');
    delete this.model._img;
    $('#url-up').removeClass('hidden');
    $('#local-up').addClass('hidden');
    $('button.local').addClass('url');
    $('button.local').removeClass('local');
  }

})
