module Api
  class TagsController < ApiController
    def index
      @tags = Tag.all.page(params[:page])
      render json: {models: @tags,
                    page: params[:page],
                    total_pages: @tags.total_pages}
    end

    def show
      @tag = Tag.find(params[:id])
      render :show
    end

    def search
      @tags = Tag.search_by_title(params[:query])
      render json: @tags
    end

    def presearch
      @tags = Tag.search_by_pre(params[:query]).page(params[:page])
      render json: {models: @tags,
                    page: params[:page],
                    total_pages: @tags.total_pages
                  }
    end
  end
end
