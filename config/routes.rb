Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, except: :destroy
  post '/users/demo', to: 'users#demo'
  resource :session, only: [:new, :create, :destroy]

  #these can be removed eventually.
  resources :questions, except: :destroy
  get '/unanswered', to: 'questions#unanswered', as: 'unanswered'
  get '/questions/tagged/:tag', to: 'questions#tagged'

  resources :tags, only: :index
  post '/answers', to: 'answers#create'
  post '/comments', to: 'comments#create'
  post '/likes', to: 'likes#toggle'

  namespace :api, defaults: { format: :json } do
    resources :users, except: [:destroy, :new, :create]
    get '/users/search', to: 'users#search'

    resources :questions, except: :destroy
    get '/questions/tagged', to: 'questions#tagged'
    get '/search', to: 'questions#search'
    get '/unanswered', to: 'questions#unanswered'

    resources :tags, only: [:index, :show]
    get '/tags/search', to: 'tags#search'
    get '/tags/psearch', to: 'tags#presearch'

    resources :comments, only: [:show, :create]
    resources :answers, only: [:show, :create, :update]
    post '/answers/:id/accept', to: 'answers#accept'

    post '/likes', to: 'likes#toggle'
    
    resource :session, only: :show
    resources :images, only: :create
  end
end
