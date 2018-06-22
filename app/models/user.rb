class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # ROLES = { admin: 'Admin',
  #           client: 'Client',
  #           commercial_client: 'Commercial client',
  #           api_client: 'API client'
  #         }

  ROLES = { admin: I18n.t('users.admin'),
    client: I18n.t('users.client'),
    commercial_client: I18n.t('users.commercial_client'),
    api_client: I18n.t('users.api_client')
  }

  def admin?
    self.role == 'admin'
  end
end
