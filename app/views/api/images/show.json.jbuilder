if @image.img
  json.img asset_path(@image.img.url)
end
