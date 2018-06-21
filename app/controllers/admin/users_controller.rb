class Admin::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to admin_user_path(@user), notice: 'User was successfully created.' }
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
  end

  def delete
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :role, :company, :company_id, :address, :country,
      :city, :phone_number, :position)
  end
end
