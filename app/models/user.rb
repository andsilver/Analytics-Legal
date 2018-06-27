class User < ApplicationRecord
  ROLES = {
    admin: I18n.t('users.admin'),
    client: I18n.t('users.client'),
    commercial_client: I18n.t('users.commercial_client'),
    api_client: I18n.t('users.api_client')
  }.freeze

  devise :session_limitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_save :clear_emtpy_values_from_allowed_ruts

  def admin?
    role == 'admin'
  end

  def client?
    role == 'client'
  end

  def commercial_client?
    role == 'commercial_client'
  end

  def api_client?
    role == 'api_client'
  end

  private

  def clear_emtpy_values_from_allowed_ruts
    self.allowed_ruts = self.allowed_ruts.delete_if { |rut| rut.empty? }
  end
end
