Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, except: [:destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :questions, only: [:new, :create]
end
