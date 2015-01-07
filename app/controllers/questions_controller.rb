class QuestionsController < ApplicationController
  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)
    @question.asker_id = current_user.id
    if @question.save
      redirect_to root_url
    else
      render :new
    end
  end

  private
  def question_params
    params.require(:question).permit(:title, :body)
  end
end
