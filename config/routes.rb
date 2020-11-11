Rails.application.routes.draw do
  devise_for :users
  root "maps#index"
  resources :maps
  resources :messages
  post 'message', to: 'maps#message', as: 'get_message' 
end
