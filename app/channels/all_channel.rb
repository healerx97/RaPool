class AllChannel < ApplicationCable::Channel
  def subscribed
    stream_from "allRaffles"
  end

  def unsubscribed
    stop_all_streams
  end
end
