module Api
  class SessionsController < ApiController
    def show
      render json: current_user || {}
    end
  end
end
