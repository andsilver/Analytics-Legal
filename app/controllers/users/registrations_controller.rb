class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters

  # GET /resource/sign_up
  def new
    raise ActionController::RoutingError.new('Not Found')
  end

  private

  def configure_permitted_parameters
    return if UserPolicy.new(current_user, current_user).change_email?

    devise_parameter_sanitizer.permit(:account_update, except: [:email])
  end
end
