class RafflesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    skip_before_action :authorize, only: [:index]
    def index
        raffles = Raffle.order(:end_time, remaining_funding: :asc)
        result = raffles.select {|raffle|
        !raffle.win
    }
        render json: result
    end

    def show
        raffle = Raffle.find(params[:id])
        render json: raffle
    end

    def create
        raffle = Raffle.create!(raffle_params)
        # ActionCable.server.broadcast("allRaffles", { body: RaffleSerializer.new(raffle)})
        render json: raffle, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: 422
    end

    def raffle_fund
        raffle = Raffle.find(params[:id])
        raffle.update!(remaining_funding: params[:remaining_funding])
        ActionCable.server.broadcast("updates", { body: "updated raffles"})
        render json: raffle, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: 422
    end

    def initiate_time
        raffle = Raffle.find(params[:id])
        time = Time.current + 10.seconds
        if !raffle.end_time
            raffle.update!(end_time: time)
            raffle.users.each {|user|
            RaffleChannel.broadcast_to(user, {body: RaffleSerializer.new(raffle)})
            }
            ActionCable.server.broadcast("updates", { body: "updated raffles"})
        end
        render json: raffle
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: 422
    end

    def yours
        user = User.find(session[:user_id])
        myraffles = user.raffles
        render json: myraffles.order(:created_at)
    end
    def destroy
        raffle = Raffle.find(params[:id])
        raffle.destroy
        head :no_content
    end

    def winrate
        total = UserRaffle.where(raffle_id: params[:id])
        if total
            s = total.sum {|b| b.bought_shares}
            userraffle = UserRaffle.find_by(user_id: session[:user_id], raffle_id: params[:id])
            if userraffle
                render json: {total: s, bought_shares: userraffle.bought_shares}
            else
                render json: {total: s, bought_shares: 0}
            end
        else
            render json: {total: 0, bought_shares: 0}
        end

    end
    private

    def render_not_found
        render json: {error: "Not Found"}, status:404
    end

    def raffle_params
        params.permit(:host_id, :remaining_funding, :purpose)
    end

    
end
