class DashboardsController < ApplicationController
  def top_defendant_ruts
    respond_to do |format|
      format.html { @cached_data = Cache::TopDefendantRutsCache.get(current_user.id) }
      format.json { render json: Cache::TopDefendantRutsCache.get(current_user.id)[:data] }
    end
  end

  def top_matters
    @cached_data = Cache::TopMattersCache.get(current_user.id)

    render(@cached_data[:data].empty? ? 'top_matters_no_ruts' : 'top_matters')
  end

  def refresh
    case params[:dashboard]
    when 'top_defendant_ruts'
      Cache::TopDefendantRutsWorker.perform_async(current_user.id)
    when 'top_matters'
      Cache::TopMattersWorker.perform_async(current_user.id)
    end
  end
end