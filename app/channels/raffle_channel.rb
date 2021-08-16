class RaffleChannel < ApplicationCable::Channel
  def subscribed
    puts 'subscribed'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
