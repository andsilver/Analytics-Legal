class CreateWhitelistedLitigators < ActiveRecord::Migration[5.0]
  def change
    create_table :whitelisted_litigators do |t|
      t.string :name
      t.string :rut
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
