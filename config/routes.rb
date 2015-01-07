Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, except: [:destroy, :index]
  resource :session, only: [:new, :create, :destroy]
  resources :questions, only: [:new, :create, :index, :show]
  post '/answers', to: 'answers#create'
  post '/comments', to: 'comments#create'
  post '/likes', to: 'likes#toggle'
end
