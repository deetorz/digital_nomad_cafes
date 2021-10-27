Rails.application.routes.draw do
  root to: 'places#index'
  resources :places, only: %i[index show]
end
