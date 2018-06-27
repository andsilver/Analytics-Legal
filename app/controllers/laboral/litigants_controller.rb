class Laboral::LitigantsController < ApplicationController
  def search
    query = params[:q]

    unless query.present?
      render json: []
      return
    end

    results = Laboral::Litigant
      .select(:Nombre, :Rut)
      .where('Nombre LIKE ? OR Rut LIKE ?', "%#{query}%", "%#{query}%")
      .uniq

    render json: {
      results: results,
      pagination: {
        more: false
      }
    }
  end
end