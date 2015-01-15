class Tag < ActiveRecord::Base
  has_many :taggings, dependent: :destroy
  has_many :tagged_questions, through: :taggings, source: :taggable, source_type: 'Question'
  has_many :tagged_users, through: :taggings, source: :taggable, source_type: 'User'

  include PgSearch
  pg_search_scope :search_by_title, against: :title
end
