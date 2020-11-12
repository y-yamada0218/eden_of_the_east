class MessagesController < ApplicationController
  
  def create
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      flash[:alert] = "error"
    end
  end

  private

  def message_params
    params.permit(:comment, :latitude, :longitude).merge(user_id: current_user.id)
  end

end
