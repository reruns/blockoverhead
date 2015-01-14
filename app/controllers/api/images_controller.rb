module Api
  class ImagesController < ApiController
    def create
      @image = Image.new(image_params)
      if @image.save!
        render :show
      else
        render json: @image.errors.full_messages, status: 422
      end
    end

    private
    def image_params
      params.require(:image).permit(:img, :img_url)
    end
  end
end
