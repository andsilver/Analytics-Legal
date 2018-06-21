class UserPolicy
  attr_reader :user

  def initialize(user, _user)
    @user = user
  end

  def create?
    user.admin?
  end
end