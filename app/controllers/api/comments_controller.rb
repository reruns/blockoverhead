module Api
  class CommentsController < ApiController
    before_filter :require_signed_in!
    def create
      @comment = current_user.comments.new(comment_params)
      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: 422
      end
    end

    def show
      @comment = Comment.find(params[:id])
      render json: @comment
    end

    private
    def comment_params
      params.require(:comment).permit(:commentable_id, :commentable_type, :body)
    end
  end
end
