class DashboardsController < ApplicationController
  def top_defendant_ruts
    @cached_data = Cache::TopDefendantRutsCache.get(current_user.id)
  end

  def top_matters
    @cached_data = Cache::TopMattersCache.get(current_user.id)

    render(@cached_data[:data].empty? ? 'top_matters_no_ruts' : 'top_matters')
  end

  def cases_on_users_ruts
    @cases = Cache::CasesOnUsersRutsCache.get(current_user.id)
  end

  def refresh
    case params[:dashboard]
    when 'top_defendant_ruts'
      TopDefendantRutsWorker.perform_async(current_user.id)
    when 'top_matters'
      TopMattersWorker.perform_async(current_user.id)
    when 'cases_on_users_ruts'
      CasesOnUsersRutsWorker.perform_async(current_user.id)
    end
  end
end