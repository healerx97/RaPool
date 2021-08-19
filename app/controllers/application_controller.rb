class ApplicationController < ActionController::API
  include ActionController::Cookies
  def authorize
    render json: {error: "You must be logged in."}, status: :unauthorized unless session.include? :user_id
  end
end
