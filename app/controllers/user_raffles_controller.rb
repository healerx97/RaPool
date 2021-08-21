class UserRafflesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    def index
        userRaffles = UserRaffle.all

        render json: userRaffles
        
    end
    def create
        if UserRaffle.exists?(user_id: params[:user_id], raffle_id: params[:raffle_id])
            userRaffle = UserRaffle.where(user_id: params[:user_id], raffle_id: params[:raffle_id]).first
            funds = params[:bought_shares].to_f + userRaffle.bought_shares.to_f
            userRaffle.update!(bought_shares: funds)
            render json: userRaffle, status: :created
        else
            userRaffle = UserRaffle.create!(user_raffles_params)
            render json: userRaffle, status: :created
        end
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: 422
    end

    private

    def render_not_found
        render json: {error: "Not Found"}, status: 404
    end

    def user_raffles_params
        params.permit(:user_id, :raffle_id, :bought_shares)
    end
end
