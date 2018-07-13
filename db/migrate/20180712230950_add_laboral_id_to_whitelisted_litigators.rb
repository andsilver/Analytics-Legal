class AddLaboralIdToWhitelistedLitigators < ActiveRecord::Migration[5.0]
  def change
    add_column :whitelisted_litigators, :laboral_id, :integer
  end
end
