BlockOverhead.Views.UserInfoForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['users/info_form'],

  render: function() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  events: {
    'click button':'submit',
    'change #input-user-av':'fileInputChange'
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

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._avatar = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._avatar;

      console.log(this.model);
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  }

})
