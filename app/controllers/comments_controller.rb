class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      respond_to do |format|
        format.json
      end
    else
      flash[:alert] = "error"
    end
  end

  def destroy
  end

  private 

  def comment_params
    params.permit(:content, :message_id).merge(user_id: current_user.id)
  end
  
end
