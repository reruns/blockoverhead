class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  #AN EMBARASSMENT OF ASSOCIATIONS
  has_many(:questions, class_name: 'Question',
           foreign_key: :asker_id, primary_key: :id)
  has_many(:answers, class_name: 'Answer',
           foreign_key: :responder_id, primary_key: :id)
  has_many(:comments, class_name: 'Comment',
           foreign_key: :author_id, primary_key: :id)
  has_many(:views, class_name: 'View',
           foreign_key: :viewer_id, primary_key: :id)
  has_many(:likes, class_name: 'Like',
           foreign_key: :liker_id, primary_key: :id)

  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_token!
    self.session_id = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_id
  end

  def view_question(question)
    view = self.views.find_by_question_id(question.id)
    if !view
      view = View.new(question_id: question.id, viewer_id: self.id)
      view.save!
      question.view_count += 1
      question.save!
    end
  end

  private
  def ensure_session_token
    self.session_id ||= SecureRandom.urlsafe_base64(16)
  end
end
