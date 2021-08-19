class RaffleChannel < ApplicationCable::Channel
  def subscribed
    host = User.find_by(id: params[:id])
    stream_for host
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
