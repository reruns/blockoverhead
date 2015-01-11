Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, except: :destroy
  resource :session, only: [:new, :create, :destroy]
  resources :questions, except: :destroy
  resources :tags, only: :index
  get '/unanswered', to: 'questions#unanswered', as: 'unanswered'
  get '/questions/tagged/:tag', to: 'questions#tagged'
  post '/answers', to: 'answers#create'
  post '/comments', to: 'comments#create'
  post '/likes', to: 'likes#toggle'

  namespace :api, defaults: { format: :json } do
    resources :users, except: [:destroy, :new, :create]
    resources :questions, except: :destroy
    resources :tags, only: [:index, :show]
    resources :comments, only: [:show, :create]
    get '/unanswered', to: 'questions#unanswered'
    post '/likes', to: 'likes#toggle'
  end
end
