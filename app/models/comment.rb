class Comment < ActiveRecord::Base
  validates :commentable_id, :commentable_type, :author_id, :body, presence: true
  belongs_to :commentable, polymorphic: true
  belongs_to(:author, class_name: 'User',
             foreign_key: :author_id, primary_key: :id)
end
