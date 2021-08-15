Rails.application.routes.draw do
  
  resources :wins
  resources :products
  # resources :user_raffles
  resources :raffles
  resources :users

  get 'participate', to: "user_raffles#create"
  get '/rafflefunds', to: "raffles#raffle_fund"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
