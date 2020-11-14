class SearchConfigsController < ApplicationController

  def update
    @search_config = SearchConfig.find(params[:id])
    @search_config.update(set_searchConfig)
  end

  private

  def set_searchConfig
    params.permit(:time,:range).merge(user_id: current_user.id)
  end

end
