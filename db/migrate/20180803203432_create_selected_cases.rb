class CreateSelectedCases < ActiveRecord::Migration[5.2]
  def change
    create_table :selected_cases do |t|
      t.references :user, foreign_key: true
      t.integer :crr_idcausa
      t.string :crr_idcausa_type

      t.timestamps
    end
  end
end
