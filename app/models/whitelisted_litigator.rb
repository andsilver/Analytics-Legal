class WhitelistedLitigator < ApplicationRecord
  belongs_to :user

  validates :rut, uniqueness: { scope: :user_id }

  def self.create_all(ruts, user_id)
    User.find(user_id).whitelisted_litigators.delete_all

    ruts.delete_if { |rut| rut.empty? }.each do |rut|
      litigant = Laboral::Litigant.find_by(rut: rut)

      create(rut: rut, user_id: user_id, name: litigant.Nombre)
    end

    self.update_cache(user_id)

    true
  end

  private

  def self.update_cache(user_id)
    MattersCacheWorker.perform_async(user_id)
    CasesCacheWorker.perform_async(user_id)
  end
end
