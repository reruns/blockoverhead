class AnswersController < ApplicationController
  before_filter :require_signed_in!
  
  def create
    @answer = Answer.new(answer_params)
    @answer.score = 0;
    @answer.responder_id = current_user.id
    @answer.save! #TODO: make this the non-bang version once testing is done.
    #welp
    redirect_to question_url(@answer.question)
  end

  private
  def answer_params
    params.require(:answer).permit(:body, :score, :question_id)
  end
end
