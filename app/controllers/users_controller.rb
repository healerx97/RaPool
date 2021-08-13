class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])

        render json: user
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    
    rescue ActiveRecord::RecordInvalid => e
        render json: {error: e.record.errors.full_messages}, status: :unprocessable_entity    
    end

    private

    def render_not_found
        render json: {error: "Not Found"}, status: 404
    end

    def user_params
        params.permit(:username, :email, :password_digest)
    end


end
