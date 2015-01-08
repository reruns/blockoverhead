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
      @question.user.view_question(@question)
      parse_tags(@question, params[:question][:tags])
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

  def edit
    @question = Question.find(params[:id])
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      parse_tags(@question, params[:question][:tags])
      redirect_to question_url(@question)
    else
      flash.now[:errors] = @question.errors.full_messages
      render :edit
    end
  end

  private
  def question_params
    params.require(:question).permit(:title, :body)
  end
end
