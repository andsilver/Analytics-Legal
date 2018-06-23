Rails.application.routes.draw do
  namespace :admin do
    resources :users
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  root to: "home#index"
end
