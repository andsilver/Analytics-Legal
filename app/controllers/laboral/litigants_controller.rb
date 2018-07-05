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

    render json: {
      results: results,
      pagination: {
        more: !results.last_page?
      }
    }
  end

  def index
    @count_cases = Cache::CasesCache.new.get(current_user.id)
    @count_cases_updated_at = Cache::CasesCache.new.get_updated_at(current_user.id).to_i
    @number_of_cases = Cache::CasesCache.new.get_number_of_cases(current_user.id).to_i

    template = @count_cases = 'null' ? "index_no_ruts" : "index"

    render template
  end

  def update_cache
    CasesCacheWorker.perform_async(current_user.id)

    redirect_to laboral_litigants_path
  end

  private

  def nombre_or_rut(query)
    Laboral::Litigant
      .select('DISTINCT Rut, Nombre, Persona')
      .where('(Nombre LIKE ? OR Rut LIKE ?) AND Persona = 2', "%#{query}%", "%#{query}%")
      .page(params[:page])
      .without_count
  end
end