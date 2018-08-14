FactoryBot.define do
  factory :menu_template do
    name "MyString"
  end
  factory :menu do
    label "MyString"
    parent_id 1
  end
  factory :selected_case do
    user nil
    crr_idcausa 1
    crr_idcausa_type "MyString"
  end
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