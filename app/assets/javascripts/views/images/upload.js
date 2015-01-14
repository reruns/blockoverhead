BlockOverhead.Views.UploadImage = Backbone.View.extend({
  tagName: 'form',
  template: JST['images/upload'],

  render: function() {
    $('#modal').append(this.template())
  },

  initialize: function(options) {
    this.callback = options.callback;
  },

  events: {
    'click button':'submit',
    'change #input-img':'fileInputChange'
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON(),
    that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function() {
        that.remove();
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

      console.log(that.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._img;

      console.log(this.model);
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-image").attr("src", src);
  }

})
