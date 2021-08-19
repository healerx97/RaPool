class AllChannel < ApplicationCable::Channel
  def subscribed
    stream_from "allRaffles"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
