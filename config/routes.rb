Rails.application.routes.draw do
  
  resources :wins
  resources :products
  resources :user_raffles
  resources :raffles
  resources :users


  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
