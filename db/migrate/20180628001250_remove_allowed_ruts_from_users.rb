class RemoveAllowedRutsFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :allowed_ruts, :string
  end
end
