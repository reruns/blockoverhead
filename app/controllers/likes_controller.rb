class LikesController < ApplicationController
  before_filter :require_signed_in!

  def toggle
    like = current_user.likes.find_or_initialize_by(
      likeable_type: params[:like][:likeable_type],
      likeable_id: params[:like][:likeable_id]
    )

    if like.persisted?
      if like.positive.to_s == params[:like][:positive]
        like.destroy
      else
        like.positive = params[:like][:positive]
        like.save!
      end
    else
      like.positive = params[:like][:positive]
      unless (like.likeable.user == current_user)
        like.save!
      end
    end
    redirect_to :back
  end
end
