class Question < ActiveRecord::Base
  #validations
  validates :title, :asker_id, :body, :score, :view_count, presence: true

  #associations
  belongs_to(:asker, class_name: 'User',
             foreign_key: :asker_id, primary_key: :id)

  has_many :comments, as: :commentable
  has_many :likes, as: :likeable

  has_many(:answers, class_name: 'Answer',
           foreign_key: :question_id, primary_key: :id)
  has_many(:views, class_name: 'View',
           foreign_key: :question_id, primary_key: :id)

  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings
end
