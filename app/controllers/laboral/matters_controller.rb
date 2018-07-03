class Laboral::MattersController < ApplicationController
  def index
    @allowed_litigator_ids = Laboral::Litigant.where(
      Rut: current_user.whitelisted_litigators.pluck(:rut)
    ).pluck(:id)

    @matters = Cache::MattersCache.new.get(current_user.id)
    @matters_updated_at = Cache::MattersCache.new.get_updated_at(current_user.id).to_i

    template = @matters.empty? ? "index_no_ruts" : "index"

    render template
  end

  def update_cache
    MattersCacheWorker.perform_async(current_user.id)

    redirect_to laboral_matters_path
  end
end