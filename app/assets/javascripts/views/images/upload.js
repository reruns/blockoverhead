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
    'click button':'submit',
    'change input#input-image':'fileInputChange',
    'change input#image-url':'urlInputChange',
    'click a#local':'showLocal',
    'click a#url':'showUrl'
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON(),
    that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function() {
        that.remove();
        that.callback(that.model.get('img'));
        $('#modal').addClass('hidden');
      }
    })
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      debugger;
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
    var $tar = $(event.currentTarget)
    this._updatePreview($tar.val())
  },

  _updatePreview: function(src){
    this.$el.find("#preview-image").attr("src", src);
  },

  showLocal: function(event) {
    event.preventDefault();
    $('form#local-up').removeClass('hidden');
    $('form#url-up').addClass('hidden');
  },

  showUrl: function(event) {
    event.preventDefault();
    $('form#url-up').removeClass('hidden');
    $('form#local-up').addClass('hidden');
  }

})
