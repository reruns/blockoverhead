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
    get '/tags/search', to: 'tags#search'
    resources :users, except: [:destroy, :new, :create]
    resources :questions, except: :destroy
    resources :tags, only: [:index, :show]
    resources :comments, only: [:show, :create]
    resources :answers, only: [:show, :create, :update]
    resource :session, only: :show
    resources :images, only: :create
    get '/search', to: 'questions#search'
    post '/answers/:id/accept', to: 'answers#accept'
    get '/unanswered', to: 'questions#unanswered'
    post '/likes', to: 'likes#toggle'
  end
end
