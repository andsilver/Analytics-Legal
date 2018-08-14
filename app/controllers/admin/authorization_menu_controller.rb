class Admin::AuthorizationMenuController < ApplicationController
  # template
  def template_index
    @templates = MenuTemplate.all
  end

  def template_new
    @template = MenuTemplate.new
  end

  def template_create
    @template = MenuTemplate.new(name: template_params[:name])

    if @template.save
      # Need to save menu_items
      template_params[:menu_items].each do |item|
        menu = Menu.create(label: item, menu_template_id: @template.id)
      end
    end

    redirect_to admin_authorization_menu_template_index_path
  end

  def template_destroy
    @template = MenuTemplate.find_by_id(params[:id])
    if @template.present?
      @template.destroy
    end

    redirect_to admin_authorization_menu_template_index_path
  end

  # custom

  private

  def template_params
    params.require(:menu_template).permit(:name, :menu_items => [])
  end
end
