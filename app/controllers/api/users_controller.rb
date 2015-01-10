module Api
  class UsersController < ApiController

    def index
      @users = User.all
      render json: @users
    end

    def show
      @user = User.find(params[:id])
      render :show
    end

    def edit
      @user = User.find(params[:id])
      render json: @user
    end

    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        parse_tags(@user, params[:user][:tags])
        render json: @user
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: @user.errors.full_messages, status: 422
      end
    end

    private
    def user_params
      params.require(:user).permit(:username, :password, :location)
    end
  end
end
