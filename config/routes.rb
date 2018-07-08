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

    resources :matters, only: [:index]

    get 'litigants/search'
  end

  namespace :dashboards do
    get 'top-defendant-ruts'
    get 'top-matters'

    post 'refresh'
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  root to: "home#index"
end
