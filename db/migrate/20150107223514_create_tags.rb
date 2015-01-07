class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :tag_id, null: false
      t.string :title, null: false
      t.timestamps
    end
  end
end
