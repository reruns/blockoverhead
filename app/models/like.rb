class Like < ActiveRecord::Base
  belongs_to :question
  belongs_to(:liker, class_name: 'User',
             foreign_key: :liker_id, primary_key: :id)
end
