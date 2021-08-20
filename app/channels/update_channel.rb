class UpdateChannel < ApplicationCable::Channel
  def subscribed
    stream_from "updates"
  end

  def unsubscribed
    stop_all_streams
  end
end
