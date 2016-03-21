module Api
  class CommentsController < ApiController
    before_filter :require_signed_in!
    def create
      @comment = current_user.comments.new(comment_params)
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: 422
      end
    end

    def show
      @comment = Comment.find(params[:id])
      render :show
    end

    def destroy
      @comment = Comment.find(params[:id])
      if @comment.author == current_user
        @comment.destroy
        render json: {}, status: 200
      else
        render @comment.errors.full_messages, status: 400
      end
    end

    private
    def comment_params
      params.require(:comment).permit(:commentable_id, :commentable_type, :body)
    end
  end
end
