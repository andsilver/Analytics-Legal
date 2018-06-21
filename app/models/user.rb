class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  ROLES = { admin: 'Admin',
            client: 'Client',
            commercial_client: 'Commercial client',
            api_client: 'API client'
          }
end
