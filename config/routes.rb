Rails.application.routes.draw do
  namespace :admin do
    resources :users
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  root to: "home#index"
end
