class Question < ActiveRecord::Base
  #validations
  validates :title, :asker_id, :body, :score, :views, presence: true

  #associations
  belongs_to(:user, class_name: 'User',
             foreign_key: :asker_id, primary_key: :id)
end
