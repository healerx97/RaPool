class WinsChannel < ApplicationCable::Channel
  def subscribed
    winner = User.find_by(id: params[:id])
    stream_for winner
  end

  def unsubscribed
    stop_all_streams
  end
end
