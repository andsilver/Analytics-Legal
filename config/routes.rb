Rails.application.routes.draw do
  namespace :admin do
    resources :users
  end

  namespace :laboral do
    resources :cases, only: [:show, :index] do
      collection do
        get 'search'
      end
    end

    resources :histories, only: [:show]
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  root to: "home#index"
end
