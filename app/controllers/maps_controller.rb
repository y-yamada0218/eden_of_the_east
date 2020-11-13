class MapsController < ApplicationController

  def index
    @search_info1 = 2160
    @search_info2 = 10
  end

  def message
    position = set_position
    searchRange = set_range
    @messages = Message.search_from_current_location(position,searchRange)
    if @messages == []
      flash[:alert] = '周辺情報が見つかりませんでした。再度、条件を変えて検索してください。'
    end
  end

  private

  def set_position
    params[:position]
  end

  def set_range
    params[:range]
  end

end
