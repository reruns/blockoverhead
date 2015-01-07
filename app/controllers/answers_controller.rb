class AnswersController < ApplicationController
  def create
    @answer = Answer.new(answer_params)
    @answer.score = 0;
    @answer.responder_id = current_user.id
    @answer.save!
    #welp
    redirect_to question_url(@answer.question)
  end

  private
  def answer_params
    params.require(:answer).permit(:body, :score, :question_id)
  end
end
