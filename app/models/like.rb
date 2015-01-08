class Like < ActiveRecord::Base
  include ActiveModel::Dirty

  belongs_to :likeable, polymorphic: :true
  belongs_to(:liker, class_name: 'User',
             foreign_key: :liker_id, primary_key: :id)

  after_save :tick_score
  after_destroy :tock_score
  before_save :doubletick_score

  private
  def tick_score
    self.likeable.score += self.positive ? 1 : -1
    self.likeable.save!
  end

  def tock_score
    self.likeable.score += self.positive ? -1 : 1
    self.likeable.save!
  end

  def doubletick_score
    return unless self.persisted? && self.positive_changed?
    self.likeable.score += self.positive ? 1 : -1
    self.likeable.save!
  end

end
