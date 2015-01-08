class CommentsController < ApplicationController
  before_filter :require_signed_in!
  def create
    @comment = current_user.comments.new(comment_params)
    #TODO: make this the non-bang version once we're confident it won't quietly 'splode
    @comment.save!
    redirect_to :back
  end

  private
  def comment_params
    params.require(:comment).permit(:commentable_id, :commentable_type, :body)
  end
end
