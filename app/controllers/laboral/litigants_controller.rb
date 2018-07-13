class Laboral::LitigantsController < ApplicationController
  def search
    query = params[:q]

    unless query.present?
      render json: {
        results: [],
        pagination: {
          more: false
        }
      }
      return
    end

    results = nombre_or_rut(query)
    filtered_results = results.each_with_object([]) do |litigant, acc|
      acc.push(litigant.filter_rut_duplicates(acc) ? litigant : nil)
    end.compact

    render json: {
      results: filtered_results,
      pagination: {
        more: !results.last_page?
      }
    }
  end

  private

  def nombre_or_rut(query)
    Laboral::Litigant
      .select('DISTINCT Id, Rut, Nombre, Persona')
      .where('(Nombre LIKE ? OR Rut LIKE ?) AND Persona = 2', "%#{query}%", "%#{query}%")
      .page(params[:page])
      .without_count
  end
end