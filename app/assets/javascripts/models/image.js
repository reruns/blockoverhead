BlockOverhead.Models.Image = Backbone.Model.extend({
  toJSON: function() {
    var json = {image: _.clone(this.attributes)};
    if (this._img) {
      json.image = this._img
    }
    return json;
  }
});
