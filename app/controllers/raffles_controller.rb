class RafflesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    def index
        raffles = Raffle.all
        render json: raffles
    end

    def show
        raffle = Raffle.find(params[:id])
        render json: raffle
    end

    def create
        raffle = Raffle.create!(raffle_params)
        render json: raffle, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: 422
    end

    def raffle_fund
        raffle = Raffle.find(params[:id])
        raffle.update!(remaining_funding: params[:remaining_funding])
        render json: raffle, status: :updated
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: 422
    end

    private

    def render_not_found
        render json: {error: "Not Found"}, status:404
    end

    def raffle_params
        params.permit(:host_id, :remaining_funding)
    end

    
end
