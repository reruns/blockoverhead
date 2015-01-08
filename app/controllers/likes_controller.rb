class LikesController < ApplicationController
  before_filter :require_signed_in!

  def toggle
    like = Like.find_by(
      likeable_type: params[:like][:likeable_type],
      likeable_id: params[:like][:likeable_id],
      liker_id: current_user.id
    )

    #TODO: hopefully simplify this
    if like
      if like.positive.to_s == params[:like][:positive]
        like.destroy
        if (like.positive)
          like.likeable.score -= 1
        else
          like.likeable.score += 1
        end
        like.likeable.save!
      else
        like.positive = params[:like][:positive]
        like.save!
        if (like.positive)
          like.likeable.score += 2
        else
          like.likeable.score -= 2
        end
        like.likeable.save!
      end
    else
      like = Like.new(
        likeable_type: params[:like][:likeable_type],
        likeable_id: params[:like][:likeable_id],
        liker_id: current_user.id,
        positive: params[:like][:positive]
      )
      #You can't like your own questions and answers. Duh.
      unless (like.likeable.user == current_user)
        like.save!
        if (like.positive)
          like.likeable.score += 1
        else
          like.likeable.score -= 1
        end
        like.likeable.save!
      end
    end
    redirect_to :back
  end
end
