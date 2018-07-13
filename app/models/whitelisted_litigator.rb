class WhitelistedLitigator < ApplicationRecord
  belongs_to :user

  def self.create_all(composite_ids, user_id)
    User.find(user_id).whitelisted_litigators.delete_all

    composite_ids.delete_if(&:empty?).each do |composite_id|
      id, rut = composite_id.split(':')
      litigant = Laboral::Litigant.find_by(Id: id, Rut: rut)

      create(rut: litigant.Rut, user_id: user_id, name: litigant.Nombre, laboral_id: id)
    end

    self.update_cache(user_id)

    true
  end

  private

  def self.update_cache(user_id)
    TopMattersWorker.perform_async(user_id)
    TopDefendantRutsWorker.perform_async(user_id)
    CasesOnUsersRutsWorker.perform_async(user_id)
  end
end
