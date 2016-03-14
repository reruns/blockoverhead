class SessionsController < ApplicationController
  def new
    session[:return_to] = cookies["return_to"]
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if user
      sign_in(user)
      redirect_back_or_default(root_url)
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out
    session[:return_to] = cookies["return_to"]
    redirect_back_or_default(root_url)
  end

  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end
end
