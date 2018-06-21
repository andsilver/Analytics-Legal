class AddFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :company, :string
    add_column :users, :company_id, :string
    add_column :users, :address, :string
    add_column :users, :country, :string
    add_column :users, :city, :string
    add_column :users, :phone_number, :string
    add_column :users, :position, :string
  end
end
