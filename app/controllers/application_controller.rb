class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :signed_in?, :parse_tags

  private
  def current_user
    @current_user ||= User.find_by_session_id(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def sign_out
    current_user.try(:reset_token!)
    session[:session_token] = nil
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def require_tag
    tags = params[:question][:tags]
    if tags =~ /^\s*$/
      flash[:errors] = ["Must have at least one tag"]
      redirect_to :back
    end
  end

  def parse_tags(taggable, tag_string)
    tags = tag_string.split.uniq
    t = []
    tags.each do |tag|
      t << Tag.find_or_create_by(title: tag)
    end
    taggable.tags=(t)
  end

end
