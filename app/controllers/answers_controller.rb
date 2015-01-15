class AnswersController < ApplicationController
  before_filter :require_signed_in!

  def create
    @answer = current_user.answers.new(answer_params)
    @answer.score = 0;
    @answer.save!
    redirect_to question_url(@answer.question)
  end

  private
  def answer_params
    params.require(:answer).permit(:body, :score, :question_id)
  end
end
