class AnswersController < ApplicationController
  def create
    @answer = Answer.new(answer_params)
    @answer.score = 0;

    #welp
    redirect_to question_url(answer.question)
  end
end
