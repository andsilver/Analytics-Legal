class AddMenuTemplateIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :menu_template_id, :integer
  end
end
