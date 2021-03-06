class Question < ActiveRecord::Base
  validates :title, :asker_id, :body, presence: true
  before_create :default_values

  include PgSearch
  pg_search_scope :search_by_info,
                  against: [:title, :body],
                  using: { tsearch: {prefix: true, dictionary: 'english' }}

  belongs_to(:user, class_name: 'User',
             foreign_key: :asker_id, primary_key: :id)

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy

  has_many(:answers, class_name: 'Answer', dependent: :destroy,
           foreign_key: :question_id, primary_key: :id)
  has_many(:views, class_name: 'View', dependent: :destroy,
           foreign_key: :question_id, primary_key: :id)

  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings

  private
  def default_values
    self.score ||= 0
    self.view_count ||= 0
  end
end
