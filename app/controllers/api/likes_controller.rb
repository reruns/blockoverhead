module Api
  class LikesController < ApiController
    before_filter :require_signed_in!

    def toggle
      like = current_user.likes.find_or_initialize_by(
        likeable_type: params[:likeable_type],
        likeable_id: params[:likeable_id]
      )

      if like.persisted?
        if like.positive.to_s == params[:positive]
          like.destroy
        else
          like.positive = params[:positive]
          like.save!
        end
      else
        like.positive = params[:positive]
        unless (like.likeable.user == current_user)
          like.save!
        end
      end
    end
  end
end