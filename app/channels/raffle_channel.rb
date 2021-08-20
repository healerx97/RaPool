class RaffleChannel < ApplicationCable::Channel
  def subscribed
    user = User.find_by(id: params[:id])
    if user
      stream_for user
    end
      
  end

  def unsubscribed
    stop_all_streams
  end
end
