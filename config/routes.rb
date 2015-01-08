Rails.application.routes.draw do
  root to: 'questions#index'

  resources :users, except: [:destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :questions, except: :destroy
  resources :tags, only: :index
  get '/questions/tagged/:tag', to: 'questions#tagged'
  post '/answers', to: 'answers#create'
  post '/comments', to: 'comments#create'
  post '/likes', to: 'likes#toggle'
end
