class Comment < ActiveRecord::Base
  validates :commentable_id, :commentable_type, :commenter_id, :body, presence: true
  belongs_to :commentable, polymorphic: true
end
