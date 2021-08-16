Rails.application.routes.draw do
  
  mount ActionCable.server => "/cable"
  resources :wins
  resources :products
  resources :user_raffles, only: [:index]
  resources :raffles
  resources :users

  post '/participate', to: "user_raffles#create"
  patch '/rafflefunds/:id', to: "raffles#raffle_fund"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
