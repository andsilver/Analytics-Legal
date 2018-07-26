class UserPolicy
  attr_reader :user

  def initialize(current_user, user)
    @current_user = current_user
    @user = user
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

  private

  def admin_or_commercial?
    @current_user.admin? || @current_user.commercial_client?
  end
end