class UserRafflesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    def create
        userRaffle = UserRaffle.create!(user_raffles_params)
        render json: userRaffle
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
