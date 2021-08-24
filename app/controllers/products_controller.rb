class ProductsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    def index
        products = Product.all
        render json: products
    end

    def show
        product = Product.find(params[:id])
        render json: product
    end

    def create
        product = Product.create!(product_params)
        raffled = product.raffle
        ActionCable.server.broadcast("allRaffles", { body: RaffleSerializer.new(raffled)})
        render json: product, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors}, status: 422
    end
    
    private

    def render_not_found
        render json: {error: "Not Found"}, status:404
    end

    def product_params
        params.permit(:name, :price, :raffle_id, :img_url, :details, :category)
    end
end
