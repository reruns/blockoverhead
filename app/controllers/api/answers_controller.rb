module Api
  class AnswersController < ApiController
    before_filter :require_signed_in!

    def create
      @answer = current_user.answers.new(answer_params)
      @answer.score = 0
      @answer.question_id = params[:question_id]
      @answer.save!
      render json: @answer
    end

    def update
      @answer = Answer.find(params[:id])
      if @answer.update(answer_params) && current_user == @answer.user
        render :show
      else
        render json: @answer.errors.full_messages, status: 422
      end
    end

    def show
      @answer = Answer.find(params[:id])
      render :show
    end

    private
    def answer_params
      params.require(:answer).permit(:body, :score, :question_id)
    end
  end
end
