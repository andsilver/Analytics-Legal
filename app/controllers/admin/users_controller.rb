class Admin::UsersController < ApplicationController
  include Pundit
  after_action :verify_authorized
  before_action :set_user, only: [:edit, :update, :destroy]
  before_action :authorize_user

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to edit_admin_user_path(@user), notice: t('notices.user_create_success') }
      else
        format.html { render :new }
      end
    end
  end

  def new
    @user = User.new
  end

  def edit
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
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

  private

  def set_user
    @user = User.find(params[:id])
  end

  def authorize_user
    authorize current_user
  end

  def user_params
    params.require(:user).permit(:email, :password, :role, :company, :company_id, :address, :country,
      :city, :phone_number, :position)
  end
end
