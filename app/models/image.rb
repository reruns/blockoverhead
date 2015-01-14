class Image < ActiveRecord::Base
  has_attached_file :img
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/

  def img_url=(url)
    unless self.img.exists?
      self.img = URI.parse(url)
    end
  end
end
