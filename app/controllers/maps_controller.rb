class MapsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    favorites = Favorite.where(user_id: current_user.id).pluck(:message_id)
    @user_favorites = Message.find(favorites)
    gon.user = @user
  end

  def message
    #ユーザの現在地
    position = set_position
    #ユーザが設定している検索範囲
    searchRange = current_user.search_config.range
    #ユーザが設定時ている検索時間
    searchTime = current_user.search_config.time
    @messages = Message.search_from_current_location(position,searchRange,searchTime)
    if @messages == []
      flash[:alert] = '周辺情報が見つかりませんでした。再度、条件を変えて検索してください。'
    end
  end

  def user_infomation
    @user_messages = current_user.messages
    favorites = Favorite.where(user_id: current_user.id).pluck(:message_id)
    @user_favorites = Message.find(favorites)
  end

  private

  def set_position
    params[:position]
  end


end
