class Laboral::HistoriesController < ApplicationController
  def show
    @histories = Laboral::History.where(id: params[:id]).order("`Fecha Tramite` DESC")
  end
end