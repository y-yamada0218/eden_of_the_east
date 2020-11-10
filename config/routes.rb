Rails.application.routes.draw do
  devise_for :users
  root "maps#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :maps
  post 'message', to: 'maps#message', as: 'message' 
end
