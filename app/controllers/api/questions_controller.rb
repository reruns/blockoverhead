module Api
  class QuestionsController < ApiController
    before_action :require_signed_in!, only: [:new, :create, :edit]

    def new
      @question = Question.new
    end

    def create
      @question = current_user.questions.new(question_params)
      if @question.save!
        @question.user.view_question(@question)
        parse_tags(@question, params[:tags])
        render json: @question
      else
        render json: @question.errors.full_messages, status: 422
      end
    end

    def index
      @questions = Question.all.page(params[:page])
      render json: {models: @questions,
                    page: params[:page],
                    total_pages: @questions.total_pages}
    end

    def show
      @question = Question.find(params[:id])
      current_user.view_question(@question) if signed_in?
      render :show
    end

    def update
      @question = Question.find(params[:id])

      if @question.update(question_params) && current_user == @question.user
        parse_tags(@question, params[:tags])
        render :show
      else
        render json: @question.errors.full_messages, status: 422
      end
    end

    def tagged
      tag = Tag.find_by(title: params[:tag])
      @questions = Question.joins(:tags).where(tags: {id: tag.id}).page(params[:page])
      render json: {models: @questions,
                    page: params[:page],
                    total_pages: @questions.total_pages}
    end

    def unanswered
      @questions = Question.includes(:answers).where(answers: {question_id: nil}).page(params[:page])
      render json: {models: @questions,
                    page: params[:page],
                    total_pages: @questions.total_pages}
    end

    def search
      qstring = params[:query]
      tag = Tag.search_by_title(qstring)
      if tag.empty?
        @questions = Question.search_by_info(qstring).page(params[:page])
        render json: {models: @questions,
                      page: params[:page],
                      total_pages: @questions.total_pages}
      else
        render json: false
      end
    end

    private
    def question_params
      params.require(:question).permit(:title, :body)
    end
  end
end
