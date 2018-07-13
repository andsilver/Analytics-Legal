class User < ApplicationRecord
  ROLES = {
    admin: I18n.t('users.admin'),
    client: I18n.t('users.client'),
    commercial_client: I18n.t('users.commercial_client'),
    api_client: I18n.t('users.api_client')
  }.freeze

  has_many :whitelisted_litigators, dependent: :destroy

  devise :session_limitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

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

  def whitelisted_litigators_ids
  end

  def whitelisted_litigators_ids=
  end

  def whitelisted_litigators_for_select
    return [] if self.whitelisted_litigators.empty?

    self.whitelisted_litigators.each_with_object([]) do |wl, memo|
      memo << ["#{wl.name} (#{wl.rut})", "#{wl.laboral_id}:#{wl.rut}"]
    end
  end

  def selected_whitelisted_litigators
    whitelisted_litigators_for_select.map { |wl| wl.last }
  end
end
