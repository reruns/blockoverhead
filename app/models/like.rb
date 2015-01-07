class Like < ActiveRecord::Base
  belongs_to :likeable, polymorphic: :true
  belongs_to(:liker, class_name: 'User',
             foreign_key: :liker_id, primary_key: :id)
end
