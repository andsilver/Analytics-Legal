FactoryBot.define do
  factory :user do
    email 'joe@gmail.com'
    password 'blahhh'
    role 'admin'

    factory :admin_user do
      role 'admin'
    end

    factory :client_user do
      role 'client'
    end

    factory :commercial_client_user do
      role 'commercial_client'
    end

    factory :api_client_user do
      role 'api_client'
    end
  end
end