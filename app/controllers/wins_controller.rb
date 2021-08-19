require 'active_support/core_ext'

class WinsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    def index
        wins = Win.where(user_id: session[:user_id])
        result = wins.map {|win| win.raffle}

        render json: result
    end

    def show
        raffles = UserRaffle.where(raffle_id: params[:id])
        total = raffles.map { |raffle|
            raffle.bought_shares }
        a = total.sum {|b| b}
        winner_num = rand(0..a)
        cum = 0
        algo = raffles.each { |raffle|
        cum += raffle.bought_shares
        if cum > winner_num
            winner = Win.create(user_id: raffle.user_id, raffle_id: raffle.raffle_id)
            ActionCable.server.broadcast("allRaffles", WinSerializer.new(winner))
            return render json: winner
        end
    }
        
    end
    private

    def render_not_found
        render json: {error: "Not Found"}, status: 404
    end


end
