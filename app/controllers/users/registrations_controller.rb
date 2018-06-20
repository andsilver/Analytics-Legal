class Users::RegistrationsController < Devise::RegistrationsController
  # GET /resource/sign_up
  def new
    raise ActionController::RoutingError.new('Not Found')
  end
end
