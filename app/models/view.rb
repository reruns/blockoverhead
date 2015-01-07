class View < ActiveRecord::Base
  validates :viewer_id, :question_id, presence: true

  belongs_to(:viewer, class_name: 'User',
             foreign_key: :viewer_id, primary_key: :id)

  belongs_to(:question, class_name: 'Question',
             foreign_key: :question_id, primary_key: :id)
end
