Rails.application.routes.draw do
  devise_for :users, controllers:{
    registrations: "users/registrations"
 }
  root "maps#index"
  resources :maps
  resources :messages
  resources :search_configs
  post 'message', to: 'maps#message', as: 'get_message' 
end
