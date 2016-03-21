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
    get '/users/search', to: 'users#search'
    resources :users, except: [:destroy, :new, :create]

    get '/search', to: 'questions#search'
    get '/questions/tagged', to: 'questions#tagged'
    get '/unanswered', to: 'questions#unanswered'
    resources :questions, except: :destroy


    get '/tags/search', to: 'tags#search'
    get '/tags/psearch', to: 'tags#presearch'
    resources :tags, only: [:index, :show]


    resources :comments, only: [:show, :create, :destroy]
    resources :answers, only: [:show, :create, :update, :destroy]
    post '/answers/:id/accept', to: 'answers#accept'

    post '/likes', to: 'likes#toggle'

    resource :session, only: :show
    resources :images, only: :create
  end
end
