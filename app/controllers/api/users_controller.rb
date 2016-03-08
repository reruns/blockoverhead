module Api
  class UsersController < ApiController

    def index
      @users = User.all.page(params[:page])
      @page = params[:page]
      render :index
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
        parse_tags(@user, params[:user][:tags]) if params[:user][:tags]
        render :show
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: @user.errors.full_messages, status: 422
      end
    end

    def search
      @users = User.search(params[:query]).page(params[:page])
      @page = params[:page]
      render :index
    end

    private
    def user_params
      params.require(:user).permit(:username, :password, :location, :avatar)
    end
  end
end
