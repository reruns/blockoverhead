class Question < ActiveRecord::Base
  validates :title, :asker_id, :body, presence: true
  before_create :default_values

  belongs_to(:user, class_name: 'User',
             foreign_key: :asker_id, primary_key: :id)

  has_many :comments, as: :commentable
  has_many :likes, as: :likeable

  has_many(:answers, class_name: 'Answer',
           foreign_key: :question_id, primary_key: :id)
  has_many(:views, class_name: 'View',
           foreign_key: :question_id, primary_key: :id)

  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings

  private
  def default_values
    self.score ||= 0
    self.view_count ||= 1
  end
end
