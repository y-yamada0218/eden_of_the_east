Rails.application.routes.draw do
  devise_for :users, controllers:{
    registrations: "users/registrations"
 }
  root "maps#index"
  resources :maps
  resources :messages
  resources :comments
  resources :search_configs
  resources :favorites
  post 'message', to: 'maps#message', as: 'get_message' 
  post 'favorite/delete', to: 'favorites#delete', as: 'delete_favorite' 
  post 'user/infomation', to: 'maps#user_infomation', as: 'get_user_infomation' 
end
