class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    skip_before_action :authorize, only: [:create]
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(session[:user_id])

        render json: user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    
    rescue ActiveRecord::RecordInvalid => e
        render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end

    private

    def render_not_found
        render json: {error: "Not Found"}, status: 404
    end

    def user_params
        params.permit(:username, :email, :password)
    end


end
