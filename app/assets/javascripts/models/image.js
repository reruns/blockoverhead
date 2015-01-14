BlockOverhead.Models.Image = Backbone.Model.extend({
  urlRoot: '/api/images',
  toJSON: function() {
    var json = {image: _.clone(this.attributes)};
    if (this._img) {
      json.image.img = this._img
    }
    return json;
  }
});
