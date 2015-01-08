class QuestionsController < ApplicationController
  before_action :require_signed_in!, only: [:new, :create, :edit]
  before_action :require_tag, only: [:create, :edit]
  def new
    @question = Question.new
  end

  def create
    @question = current_user.questions.new(question_params)

    @question.score = 0;
    @question.view_count = 0;
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
    current_user.view_question(@question) if signed_in?
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

  def tagged
    tag = Tag.find_by(title: params[:tag])
    @questions = Question.joins(:tags).where(tags: {id: tag.id}).all
    render :index
  end

  def unanswered
    @questions = Question.includes(:answers).where(answers: {question_id: nil})
    render :index
  end

  private
  def question_params
    params.require(:question).permit(:title, :body)
  end
end
