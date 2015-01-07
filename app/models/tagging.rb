class Tagging < ActiveRecord::Base
  validates :taggable_id, :taggable_type, :tag_id, presence: true
  
  belongs_to (:tag, class_name: 'Tag', foreign_key: :tag_id, primary_key: :id)
  belongs_to :taggable, polymorphic: true
end
