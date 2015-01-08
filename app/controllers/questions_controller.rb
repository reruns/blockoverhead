class QuestionsController < ApplicationController
  before_filter :require_signed_in!, only: [:new, :create, :edit]
  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)

    #TODO: probably move this to the helper or smth?
    if params[:question][:tags] =~ /^\s*$/
      flash.now[:errors] = ["Must have at least one tag"]
      render :new
      return
    end

    @question.asker_id = current_user.id
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

    if params[:question][:tags] =~ /^\s*$/
      flash.now[:errors] = ["Must have at least one tag"]
      render :new
      return
    end

    if @question.update(question_params)
      parse_tags(@question, params[:question][:tags])
      redirect_to question_url(@question)
    else
      flash.now[:errors] = @question.errors.full_messages
      render :edit
    end
  end

  #These two are probably better off having their own views
  #not a big deal for now
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
