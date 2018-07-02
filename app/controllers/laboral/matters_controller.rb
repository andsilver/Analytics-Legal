class Laboral::MattersController < ApplicationController
  def index
    @allowed_litigator_ids = Laboral::Litigant.where(
      Rut: current_user.whitelisted_litigators.pluck(:rut)
    ).pluck(:id)

    @matters = Cache::MattersCache.new.get(current_user.id)
  end
end