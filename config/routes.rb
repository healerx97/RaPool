Rails.application.routes.draw do
  
  mount ActionCable.server => "/cable"

  resources :wins
  resources :products
  resources :user_raffles, only: [:index]
  resources :raffles
  resources :users, only: [:index, :destroy]

  post '/participate', to: "user_raffles#create"
  patch '/rafflefunds/:id', to: "raffles#raffle_fund"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '/broadcastwin/:id', to: 'wins#broadcast_win'
  patch '/initiatetime/:id', to: "raffles#initiate_time"
  get '/redeem/:id', to: "wins#redeem_win"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
