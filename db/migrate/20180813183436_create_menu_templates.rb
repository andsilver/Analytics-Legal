class CreateMenuTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :menu_templates do |t|
      t.string :name

      t.timestamps
    end
  end
end
