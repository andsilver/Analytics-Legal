class Admin::UsersController < ApplicationController
  include Pundit
  after_action :verify_authorized
  before_action :set_user, only: [:edit, :update, :destroy]
  before_action :authorize_user

  content_security_policy do |p|
    p.connect_src "*"
  end

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        create_litigators(@user.id)
        format.html { redirect_to laboral_rut_selection_admin_users_path, notice: t('notices.user_create_success') }
      else
        format.html { render :new }
      end
    end
  end

  def new
    @user = User.new
    @templates = MenuTemplate.all
  end

  def edit
    @templates = MenuTemplate.all
  end

  def update
    filter_empty_password
    respond_to do |format|
      if @user.update(user_params) && create_litigators(params[:id])
        format.html { redirect_to admin_users_path, notice: t('notices.user_update_success') }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to admin_users_path, notice: t('notices.user_delete_success') }
    end
  end

  def laboral_rut_selection
  end

  def cases_laboral_my_cases
  end

  def cases_civil_my_cases
  end

  def cases_cobranzas_my_cases
  end

  private

  def create_litigators(user_id)
    WhitelistedLitigator.create_all(params[:user][:whitelisted_litigators_ids], user_id)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def authorize_user
    authorize current_user
  end

  def user_params
    params.require(:user).permit(:email, :password, :role, :company, :company_id, :address, :country,
      :city, :phone_number, :position, :menu_template_id)
  end

  def filter_empty_password
    if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end
  end
end
