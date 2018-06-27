class AddAllowedRutsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :allowed_ruts, :string, array: true, default: []
  end
end
