require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  namespace :admin do
    resources :users do
      collection do
        get 'laboral_rut_selection'
      end
    end
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

    get 'litigants/search'
  end

  namespace :dashboards do
    get 'top-defendant-ruts'
    get 'top-matters'
    get 'cases-on-users-ruts'

    post 'refresh'
  end

  get 'virtual_dashboards/1' => 'virtual_dashboards#one'
  get 'virtual_dashboards/2' => 'virtual_dashboards#two'
  get 'virtual_dashboards/3' => 'virtual_dashboards#three'
  get 'virtual_dashboards/4' => 'virtual_dashboards#four'
  get 'virtual_dashboards/5' => 'virtual_dashboards#five'
  get 'virtual_dashboards/6' => 'virtual_dashboards#six'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  root to: "home#index"
end
