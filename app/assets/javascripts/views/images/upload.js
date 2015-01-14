BlockOverhead.Views.UploadImage = Backbone.View.extend({
  tagName: 'form',
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
    'change input#input-image':'fileInputChange'
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
      }
    })
  },

  fileInputChange: function(event){
    console.log('changin');

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

  _updatePreview: function(src){
    this.$el.find("#preview-image").attr("src", src);
  }

})
