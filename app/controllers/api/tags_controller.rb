module Api
  class TagsController < ApiController
    def index
      @tags = Tag.all
      render json: @tags
    end

    def show
      @tag = Tag.find(params[:id])
      render :show
    end

    def search
      @tags = Tag.search_by_title(params[:query])
      render json: @tags
    end
  end
end
