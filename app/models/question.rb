class Question < ActiveRecord::Base
  #validations
  validates :title, :asker_id, :body, :score, :views, presence: true

  #associations
  belongs_to(:asker, class_name: 'User',
             foreign_key: :asker_id, primary_key: :id)

  has_many :comments, as: :commentable

  has_many(:answers, class_name: 'Answer',
           foreign_key: :question_id, primary_key: :id)
end
