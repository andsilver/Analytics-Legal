FactoryBot.define do
  factory :litigant, class: Laboral::Litigant do
    sequence(:Id)
    Tipo 1
    sequence(:Tribunal)
    Estado { [0, 1].sample }
    Rut '0-0'
    Persona 2
    Nombre 'Foo'
  end

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