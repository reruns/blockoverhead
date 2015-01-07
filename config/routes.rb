Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, except: [:destroy, :index]
  resource :session, only: [:new, :create, :destroy]
  resources :questions, only: [:new, :create, :index, :show]
  resources :answer, only: [:create]
end
