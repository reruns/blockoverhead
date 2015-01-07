class QuestionsController < ApplicationController
  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)
    @question.asker_id = current_user.id
    @question.score = 0;
    @question.view_count = 1;
    if @question.save!
      @question.asker.view_question(@question)
      redirect_to questions_url
    else
      render :new
    end
  end

  def index
    @questions = Question.all
  end

  def show
    @question = Question.find(params[:id])
  end

  private
  def question_params
    params.require(:question).permit(:title, :body)
  end
end
