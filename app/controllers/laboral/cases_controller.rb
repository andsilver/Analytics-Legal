class Laboral::CasesController < ApplicationController
  def search
    @case = Laboral::Case.new
  end

  def index_by_ruc
    @case = Laboral::Case.new
    @cases = Laboral::Case.where(RUC: params[:laboral_case][:RUC])
  end

  def index_by_rut
    @allowed_litigator_ids = Laboral::Litigant.where(
      Rut: current_user.whitelisted_litigators.pluck(:rut)
    ).pluck(:id)

    @cases = Laboral::Case.where(Id: @allowed_litigator_ids).to_json
  end
end