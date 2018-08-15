class UserPolicy
  attr_reader :user

  def initialize(current_user, user)
    @current_user = current_user
    @user = user
    @menus = current_user.menu_template&.menus&.pluck(:label)
  end

  def index?
    admin_or_commercial?
  end

  def create?
    admin_or_commercial?
  end

  def new?
    admin_or_commercial?
  end

  def edit?
    admin_or_commercial?
  end

  def update?
    admin_or_commercial?
  end

  def destroy?
    admin_or_commercial?
  end

  def change_email?
    admin_or_commercial?
  end

  def laboral_rut_selection?
    admin_or_commercial?
  end

  def cases_laboral_my_cases?
    admin_or_commercial?
  end

  def cases_civil_my_cases?
    admin_or_commercial?
  end

  def cases_cobranzas_my_cases?
    admin_or_commercial?
  end

  # policy related to the menu authorization
  def summary_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('summary')
  end

  def cases_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('cases')
  end

  def notifications_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('notifications')
  end

  def zeus_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('zeus')
  end

  def deep_graph_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('deep_graph')
  end

  def deep_search_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('deep_search')
  end

  def predict_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('predict')
  end

  def admin_menu_authorized?
    admin_or_commercial? || @menus.present? && @menus.include?('admin')
  end

  private

  def admin_or_commercial?
    @current_user.admin? || @current_user.commercial_client?
  end
end