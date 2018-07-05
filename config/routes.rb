require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  namespace :admin do
    resources :users
  end

  namespace :laboral do
    resources :cases, only: [:show] do
      collection do
        get 'index_by_ruc'
        get 'index_by_rut'
        get 'search'
      end
    end

    resources :histories, only: [:show]

    resources :matters, only: [:index] do
      collection do
        post 'update_cache'
      end
    end

    resources :litigants, only: [:index] do
      collection do
        post 'update_cache'
      end
    end

    get 'litigants/search'
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  root to: "home#index"
end
