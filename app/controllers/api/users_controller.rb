module Api
  class UsersController < ApiController
    def new
      @user = User.new
      render json: @user
    end

    def index
      @users = User.all
      render json: @users
    end

    def create
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        render json: @user
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def show
      @user = User.find(params[:id])
      render json: @user
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
