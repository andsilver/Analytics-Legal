class Laboral::CasesController < ApplicationController
  def search
    @case = Laboral::Case.new
  end

  def index_by_ruc
    @case = Laboral::Case.new
    @cases = Laboral::Case.where(RUC: params[:laboral_case][:RUC])
  end
end