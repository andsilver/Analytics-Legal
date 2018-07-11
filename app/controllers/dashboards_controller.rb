class DashboardsController < ApplicationController
  def top_defendant_ruts
    @cached_data = Cache::TopDefendantRutsCache.get(current_user.id)
  end

  def top_matters
    @cached_data = Cache::TopMattersCache.get(current_user.id)

    render(@cached_data[:data].empty? ? 'top_matters_no_ruts' : 'top_matters')
  end

  def cases_on_users_ruts
    serializer = Serializers::CasesOnUsersRutsSerializer.new(current_user)
    respond_to do |format|
      format.html { @cases = Cache::CasesOnUsersRutsCache.get(current_user.id) }
      format.json do
        render json: serializer.to_json(
          draw: params[:draw],
          limit: params[:length],
          offset: params[:start],
          columns: params[:columns],
          order: params[:order]
        )
      end
    end
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