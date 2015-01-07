class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    @comment.save! #TODO: make this the non-bang version once testing is done.
    #welp
    redirect_to question_url(@comment.question)
  end

  private
  def comment_params
    params.require(:comment).permit(:commentable_id, :commentable_type, :body)
  end
end
