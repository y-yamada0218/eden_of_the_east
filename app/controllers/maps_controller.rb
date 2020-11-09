class MapsController < ApplicationController

  def index
    @messages = Message.all
    gon.messages = @messages
  end

  def show
    @messages = Message.all
    gon.messages = @messages
  end

end
