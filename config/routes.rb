Rails.application.routes.draw do
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

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  root to: "home#index"
end
