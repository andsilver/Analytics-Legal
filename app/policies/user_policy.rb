class UserPolicy
  attr_reader :user

  def initialize(current_user, user)
    @current_user = current_user
    @user = user
  end

  def create?
    @current_user.admin?
  end

  def change_email?
    @current_user.admin? || @current_user.commercial_client?
  end
end