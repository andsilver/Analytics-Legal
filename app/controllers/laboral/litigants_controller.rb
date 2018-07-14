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

    partitioned_array = results.to_a.partition { |l| l.Rut == '0-0' }
    filtered_results = [partitioned_array[0], partitioned_array[1].uniq { |l| l.Rut }].flatten

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
      .select('ANY_VALUE(Id) as Id, Rut, ANY_VALUE(Nombre) as Nombre, ANY_VALUE(Persona) as Persona')
      .where.not(Rut: '0-0')
      .where(Persona: 2)
      .where('(Nombre LIKE ? OR Rut LIKE ?)', "%#{query}%", "%#{query}%")
      .group(:Rut)
      .union(
        Laboral::Litigant
          .select('Id, Rut, Nombre, Persona')
          .where(Rut: '0-0', Persona: 2)
          .where('(Nombre LIKE ? OR Rut LIKE ?)', "%#{query}%", "%#{query}%")
      )
      .page(params[:page])
      .without_count
  end
end