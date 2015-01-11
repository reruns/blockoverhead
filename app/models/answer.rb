class Answer < ActiveRecord::Base
  #validations
  validates :responder_id, :question_id, :body, :score, presence: true
  before_create :default_values
  #associations
  belongs_to(:user, class_name: 'User',
             foreign_key: :responder_id, primary_key: :id)
  belongs_to(:question, class_name: 'Question',
             foreign_key: :question_id, primary_key: :id)


  has_many :comments, as: :commentable
  has_many :likes, as: :likeable

  private
  def default_values
    self.score ||= 0
  end
end
