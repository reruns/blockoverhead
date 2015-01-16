class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.text :title, null: false
      t.timestamps
    end
  end
end
