class Answer < ActiveRecord::Base
  #validations
  validates :responder_id, :question_id, :body, :score, presence: true

  #associations
  belongs_to(:responder, class_name: 'User',
             foreign_key: :responder_id, primary_key: :id)
  belongs_to(:question, class_name: 'Question',
             foreign_key: :question_id, primary_key: :id)
end
