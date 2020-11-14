class MapsController < ApplicationController

  def index
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

  private

  def set_position
    params[:position]
  end


end
