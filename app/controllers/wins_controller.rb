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
        count = 0
        cum_ary = []
        total.each {|c|
            count += c
            cum_ary << count
        }
        cum = cum_ary.find {|i| i >= winner_num}
        cum_id = cum_ary.find_index(cum)
        winner_id = raffles[cum_id].user_id
        winner = Win.create!(user_id: winner_id, raffle_id: raffles[cum_id].raffle_id)
        # byebug
        render json: winner, status: :created
        
    end

    def broadcast_win
        win = Win.find(params[:id])
        r = Raffle.find(win.raffle_id)
            userss = r.users
            userss.each {|user|
                WinsChannel.broadcast_to(user, {winner: UserSerializer.new(User.find(win.user_id)), raffle: RaffleSerializer.new(r)})
            }
    end
    private

    def render_not_found
        render json: {error: "Not Found"}, status: 404
    end


end
